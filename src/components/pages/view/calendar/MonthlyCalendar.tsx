// 월간 캘린더

import { CalendarWeekRow } from './CalendarWeekRow';
import { MoodKey } from '@/constants/moodMap';
import { generateCalendarMatrix } from '@/lib/calenderUtils';

interface Props {
  year: number;
  month: number;
  moodData?: Record<string, MoodKey>;
}

export const MonthlyCalendar = ({ year, month, moodData = {} }: Props) => {
  const matrix = generateCalendarMatrix(year, month); // Date[][]

  return (
    <>
      {matrix.map((week, i) => (
        <CalendarWeekRow
          key={i}
          dates={week}
          moodData={moodData}
          currentMonth={month}
          showDayLabels={i === 0}
        />
      ))}
    </>
  );
};
