"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/routes.ts
var import_dayjs = __toESM(require("dayjs"));
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes.ts
async function appRoutes(app2) {
  app2.post("/habits", async (request) => {
    const createHabitBody = import_zod.z.object({
      title: import_zod.z.string(),
      weekDays: import_zod.z.array(import_zod.z.number().min(0).max(6)),
      id_user: import_zod.z.string().uuid()
    });
    const { title, weekDays, id_user } = createHabitBody.parse(request.body);
    const today = (0, import_dayjs.default)().startOf("day").toDate();
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        user_id: id_user,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay
            };
          })
        }
      }
    });
  });
  app2.get("/day", async (request) => {
    const getDayParams = import_zod.z.object({
      date: import_zod.z.coerce.date(),
      id_user: import_zod.z.string().uuid()
    });
    const { date, id_user } = getDayParams.parse(request.query);
    const parsedDate = (0, import_dayjs.default)(date).startOf("day");
    const weekDay = parsedDate.get("day");
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        },
        user_id: id_user
        // dayHabits: {
        //   some: {
        //     user_id: id_user,
        //   },
        // },
      }
    });
    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
        dayHabits: {
          some: {
            user_id: id_user
          }
        }
      },
      include: {
        dayHabits: true
      }
    });
    const completedHabits = day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id;
    }) ?? [];
    return {
      possibleHabits,
      completedHabits
    };
  });
  app2.patch("/habits/:id/toggle/:id_user", async (request) => {
    const toggleHabitParams = import_zod.z.object({
      id: import_zod.z.string().uuid(),
      id_user: import_zod.z.string().uuid()
    });
    const { id, id_user } = toggleHabitParams.parse(request.params);
    const today = (0, import_dayjs.default)().startOf("day").toDate();
    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    });
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      });
    }
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id_user_id: {
          day_id: day.id,
          habit_id: id,
          user_id: id_user
        }
      }
    });
    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
          user_id: id_user
        }
      });
    }
  });
  app2.post("/users", async (request, response) => {
    const createUserBody = import_zod.z.object({
      name: import_zod.z.string(),
      photo: import_zod.z.string(),
      email: import_zod.z.string()
    });
    const { name, photo, email } = createUserBody.parse(request.body);
    let existingUser = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          name,
          photo,
          email
        }
      });
    }
    return existingUser;
  });
  app2.get("/users", async () => {
    let users = await prisma.user.findMany({});
    return users;
  });
  app2.get("/summary", async (request) => {
    const userParams = import_zod.z.object({
      id_user: import_zod.z.string().uuid()
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
          JOIN user U
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
            HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
            AND H.user_id = ${id_user}
        ) as amount
      FROM days D
    `;
    return summary;
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: "*"
});
app.register(appRoutes);

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod2 = require("zod");
(0, import_dotenv.config)();
var envSchema = import_zod2.z.object({
  DATABASE_URL: import_zod2.z.string(),
  DATABASE_CLIENT: import_zod2.z.enum(["sqlite", "pg"]),
  PORT: import_zod2.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error(
    "\u{1F635}\u{1F635}\u{1F635} Oh no! Invalid environment variables!",
    _env.error.format()
  );
  throw new Error("Invalid environment variables!");
}
var env = _env.data;

// src/server.ts
app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => {
  console.log("HTTP Server running!");
});
