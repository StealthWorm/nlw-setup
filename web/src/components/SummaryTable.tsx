import { HabitDay } from './HabitDay';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { useContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';
import { AuthContext } from '../contexts/AuthContext';

import { GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../lib/firebase"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOdDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className='w-full flex z-10 
      sm:flex-col sm:px-8
      md:flex-row md:px-0
    '
    >
      {/* <button type='button' onClick={() => signOut(auth)}>Logout</button> */}
      <div className='grid gap-3
        sm:grid-flow-col
        md:grid-flow-row
      '
      >
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className='text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center
              sm:relative
              md:relative
              '
            >
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className='grid gap-3
      sm:grid-cols-7 sm:grid-flow-row
      md:grid-rows-7 md:grid-flow-col md:relative
      '
      >
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                defaultAmount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}
        {amountOdDaysToFill > 0 &&
          Array.from({ length: amountOdDaysToFill }).map((_, i) => (
            <div
              key={i}
              className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'
            ></div>
          ))}
      </div>
    </div>
  );
}