// components/calendar/CalendarRow.tsx
import styled from 'styled-components';
import { CalendarCell } from './CalendarCell';
import { MoodKey } from '@/constants/moodMap';
import { DAYS } from '@/constants/days';
import { toLocalDateKey } from '@/lib/calenderUtils';

interface CalendarRowProps {
  dates: Date[];
  moodData?: Record<string, MoodKey>;
  currentMonth: number;
  showDayLabels?: boolean;
}

export const CalendarWeekRow = ({
  dates,
  moodData = {},
  currentMonth,
  showDayLabels = false,
}: CalendarRowProps) => {
  return (
    <Wrapper>
      {showDayLabels && (
        <DaysRow>
          {DAYS.map((d) => (
            <DayTitle key={d}>{d}</DayTitle>
          ))}
        </DaysRow>
      )}
      <Row>
        {dates.map((date) => {
          const dateKey = toLocalDateKey(date);
          const mood = moodData[dateKey];

          return (
            <CalendarCell
              key={dateKey}
              date={date}
              mood={mood}
              isCurrentMonth={date.getMonth() === currentMonth}
            />
          );
        })}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const DayTitle = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 0.875rem;
  color: #a5b7c6;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 46px;
`;
