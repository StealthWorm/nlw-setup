import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useMutation } from 'react-query';
import { api } from '../lib/axios';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';

import { HabitsInfo } from './HabitModal';

interface HabitsListProps {
  date: Date;
  handleCompletedPercentage: (percentage: number) => void;
  habitsInfo: HabitsInfo;
  onCompletedChanged: (
    habitsInfo: HabitsInfo,
    completedHabits: string[]
  ) => void;
}

export function HabitsList({ date, handleCompletedPercentage, habitsInfo, onCompletedChanged }: HabitsListProps) {
  const { mutate: handleToggleHabit } = useMutation(async (habitId: string) => {
    api.patch(`habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted =
      habitsInfo.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo.completedHabits, habitId];
    }

    const updatedCompletedPercentage = calculateCompletedPercentage(
      habitsInfo.possibleHabits.length,
      completedHabits.length
    );
    handleCompletedPercentage(updatedCompletedPercentage);
    onCompletedChanged(habitsInfo, completedHabits);
  })

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className='mt-6 flex flex-col gap-3 z-20'>
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInPast}
            className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-[color:var(--bg-modal-color)] border-2 border-[color:var(--text-color)] group-data-[state=checked]:bg-[color:var(--primary-focus-color)] group-data-[state=checked]:border-[color:var(--primary-focus-color)] transition-colors group-focus:ring-2 group-focus:ring-green-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
              <Checkbox.Indicator>
                <Check size={20} className='text-white' />
              </Checkbox.Indicator>
            </div>

            <span className='font-semibold text-xl text-[color:var(--text-color)] leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-[color:var(--text-color-placeholder)]'>
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}