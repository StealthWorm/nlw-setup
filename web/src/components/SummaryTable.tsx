import { HabitDay } from './HabitDay';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Oval } from 'react-loader-spinner';
import { WarningCircle } from 'phosphor-react';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOdDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function SummaryTable() {
  // const [summary, setSummary] = useState<Summary>([]);

  const {
    data: summary,
    isFetching,
    isError,
  } = useQuery('summary', async () => {
    const response = await api.get<Summary[]>('/summary');

    return response.data;
  }, {
    staleTime: 1000 * 60 //1min
  });

  // useEffect(() => {
  //   api.get('summary').then((response) => {
  //     setSummary(response.data);
  //   });
  // }, []);

  return (
    <>
      <div className='w-full flex transition-all z-0
      sm:flex-col sm:px-8
      md:flex-row md:px-0
    '
      >
        <div className='grid gap-3
        sm:grid-flow-col sm:sticky sm:top-[12rem]
        md:grid-flow-row md:relative md:top-0
      '
        >
          {weekDays.map((weekDay, index) => {
            return (
              <div
                key={`${weekDay}-${index}`}
                className='text-[color:var(--text-color)] text-xl font-bold h-10 w-10 flex items-center justify-center
            
              '
              >
                {weekDay}
              </div>
            );
          })}
        </div>
        <div className='grid gap-3
      sm:grid-cols-7 sm:grid-flow-row
      md:grid-rows-7 md:grid-flow-col 
      '
        >
          {summary && summary.length > 0 &&
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

      {isFetching &&
        <Oval
          height={30}
          width={30}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#cfcfcf"
          strokeWidth={4}
          strokeWidthSecondary={4}
          color="#ffffff"
        />
      }

      {isError && (
        <div className="h-8 font-medium flex gap-2 items-center justify-center">
          <WarningCircle size={24} className="text-red-600" />
          Ocorreu um erro ao buscar os dados da API.
        </div>
      )}

      {!isError && !isFetching && <div className="h-8"></div>}
    </>
  );
}