import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
      id_user: z.string().uuid(),
    });

    const { title, weekDays, id_user } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        user_id: id_user,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
      id_user: z.string().uuid(),
    });

    const { date, id_user } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
        user_id: id_user,
        // dayHabits: {
        //   some: {
        //     user_id: id_user,
        //   },
        // },
      },
    });

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
        dayHabits: {
          some: {
            user_id: id_user,
          },
        },
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];

    return {
      possibleHabits,
      completedHabits,
    };
  });

  app.patch("/habits/:id/toggle/:id_user", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
      id_user: z.string().uuid(),
    });

    const { id, id_user } = toggleHabitParams.parse(request.params);

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id_user_id: {
          day_id: day.id,
          habit_id: id,
          user_id: id_user,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
          user_id: id_user,
        },
      });
    }
  });

  app.post("/users", async (request, response) => {
    const createUserBody = z.object({
      name: z.string(),
      photo: z.string(),
      email: z.string(),
    });

    const { name, photo, email } = createUserBody.parse(request.body);

    let existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          name,
          photo,
          email,
        },
      });
    }

    return existingUser;
  });

  app.get("/users", async () => {
    let users = await prisma.user.findMany({});

    return users;
  });

  app.get("/summary", async (request) => {
    const userParams = z.object({
      id_user: z.string().uuid(),
    });

    const { id_user } = userParams.parse(request.query);

    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH
          JOIN users U
            ON U.id = DH.user_id
          WHERE DH.day_id = D.id
          AND U.id = ${id_user}
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HDW
          JOIN habits H
            ON H.id = HDW.habit_id 
          WHERE
            HDW.week_day = EXTRACT(ISODOW FROM D.date)::INTEGER
            -- cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
            AND H.user_id = ${id_user}
        ) as amount
      FROM days D
    `;

    return summary;
  });
}
