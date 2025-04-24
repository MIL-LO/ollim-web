// 주간 캘린더

import { CalendarWeekRow } from './CalendarWeekRow';
import { MoodKey } from '@/constants/moodMap';
import { getStartDateOfWeek } from '@/lib/calenderUtils';

interface Props {
  year: number;
  month: number;
  week: number;
  moodData: Record<string, MoodKey>;
}

export const WeeklyCalendar = ({ year, month, week, moodData }: Props) => {
  const start = getStartDateOfWeek(year, month, week);
  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <CalendarWeekRow
      dates={weekDates}
      moodData={moodData}
      currentMonth={month}
      showDayLabels={true}
    />
  );
};
