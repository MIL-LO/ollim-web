import { generateCalendarMatrix } from '@/lib/calenderUtils';
import styled from 'styled-components';
import { DaysTitle } from '../CalendarWeekRow';

interface WeekStepProps {
  year: number;
  month: number; // 0-indexed
  selectedWeek: number;
  onSelect: (weekIndex: number) => void;
}

export const WeekStep = ({ year, month, selectedWeek, onSelect }: WeekStepProps) => {
  const weeks = generateCalendarMatrix(year, month); // Date[][]

  return (
    <WeekGrid>
      <DaysTitle />
      <div>
        {weeks.map((weekDates, i) => (
          <WeekRow key={i} $selected={selectedWeek === i + 1} onClick={() => onSelect(i + 1)}>
            {weekDates.map((date, j) => (
              <DateCell key={j} $dimmed={date.getMonth() !== month}>
                {date.getDate()}
              </DateCell>
            ))}
          </WeekRow>
        ))}
      </div>
    </WeekGrid>
  );
};

const WeekGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px 40px;
`;

const WeekRow = styled.div<{ $selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 32px;

  border-radius: 12px;
  background-color: ${({ $selected }) => ($selected ? '#D2F6FF' : 'transparent')};

  color: ${({ $selected }) => ($selected ? '#00AFD8' : '#A5B7C6')};

  cursor: pointer;
`;

const DateCell = styled.div<{ $dimmed?: boolean }>`
  flex: 1;

  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: -1%;
  opacity: ${({ $dimmed }) => ($dimmed ? '0.3' : '1')};
  font-weight: ${({ $dimmed }) => ($dimmed ? '400' : '600')};
`;
