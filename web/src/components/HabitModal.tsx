import { useContext, useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { api } from '../lib/axios';

import { HabitsList } from './HabitsList';
import { ProgressBar } from './ProgressBar';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';
import { AuthContext } from '../contexts/AuthContext';
import { useMutation } from 'react-query';

interface HabitModalProps {
  date: Date;
  handleCompletedPercentage: (percentage: number) => void;
  completedPercentage: number;
}

export interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function HabitModal({ date, handleCompletedPercentage, completedPercentage }: HabitModalProps) {
  const { currentUser } = useContext(AuthContext);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const dateAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  useEffect(() => {
    getHabitsData();
  }, []);

  const { mutate: getHabitsData } = useMutation(async () => {
    const response = await api.get<HabitsInfo>('/day', {
      params: {
        date: date.toISOString(),
      },
    }).then((response) => {
      setHabitsInfo(response.data);
      const updatedCompletedPercentage = calculateCompletedPercentage(
        response.data.possibleHabits.length,
        response.data.completedHabits.length
      );
      handleCompletedPercentage(updatedCompletedPercentage);
    });
  });

  // useEffect(() => {
  //     api.get('day', {
  //       params: {
  //         date: date.toISOString(),
  //       },
  //     })
  //       .then((response) => {
  //         setHabitsInfo(response.data);
  //         const updatedCompletedPercentage = calculateCompletedPercentage(
  //           response.data.possibleHabits.length,
  //           response.data.completedHabits.length
  //         );
  //         handleCompletedPercentage(updatedCompletedPercentage);
  //       });
  // }, []);

  function handleCompletedChanged(
    habitsInfo: HabitsInfo,
    completedHabits: string[]
  ) {
    setHabitsInfo({
      possibleHabits: habitsInfo.possibleHabits,
      completedHabits,
    });
  }

  if (!habitsInfo) {
    return <div></div>;
  }

  return (
    <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-[color:var(--bg-color-modal)] flex flex-col focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-focus-color)] focus:ring-offset-2 focus:ring-offset-zinc-900 z-20'>
      <span className='font-semibold text-[color:var(--text-color)] first-letter:capitalize'>
        {dayOfWeek}
      </span>
      <span className='mt-1 font-extrabold loading-tight text-3xl text-[color:var(--text-color)]'>
        {dateAndMonth}
      </span>
      <ProgressBar progress={completedPercentage} />
      <HabitsList
        date={date}
        handleCompletedPercentage={handleCompletedPercentage}
        habitsInfo={habitsInfo}
        onCompletedChanged={handleCompletedChanged}
      />
      <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
    </Popover.Content>
  );
}