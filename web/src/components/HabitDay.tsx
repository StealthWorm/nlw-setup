import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { useState } from 'react';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';
import { HabitModal } from './HabitModal';

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  defaultAmount?: number;
}

export function HabitDay({ defaultCompleted = 0, defaultAmount = 0, date }: HabitDayProps) {
  const defaultCompletedPercentage = calculateCompletedPercentage(defaultAmount, defaultCompleted);

  const [completedPercentage, setCompletedPercentage] = useState(defaultCompletedPercentage);

  function handleCompletedPercentage(percentage: number) {
    setCompletedPercentage(percentage);
  }

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-background',
          {
            'animate-pulse shadow-emerald-500 shadow-custom-md border-emerald-100': isCurrentDay,
            ' border-emerald-900': completedPercentage === 0,
            'bg-emerald-900 border-emerald-700':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-emerald-800 border-emerald-600':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-emerald-700 border-emerald-500':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-emerald-600 border-emerald-500':
              completedPercentage >= 60 && completedPercentage < 80,
            'bg-emerald-500 border-emerald-400': completedPercentage >= 80,
          }
        )}
      />
      <Popover.Portal>
        <>
          <HabitModal
            date={date}
            handleCompletedPercentage={handleCompletedPercentage}
            completedPercentage={completedPercentage}
          />
        </>
      </Popover.Portal>
    </Popover.Root>
  );
}
