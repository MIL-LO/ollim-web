import styled from 'styled-components';
import { moodMap, MoodKey } from '@/constants/moodMap';

interface Props {
  date: Date;
  isCurrentMonth: boolean;
  mood?: MoodKey;
}

export const CalendarCell = ({ date, isCurrentMonth, mood }: Props) => {
  const data = mood ? moodMap[mood] : null;
  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <CellWrapper $dimmed={!isCurrentMonth}>
      <DayText $isToday={isToday}>{date.getDate()}</DayText>
      {data ? (
        <MoodCircle $color={data.color}>
          <img src={data.icon} alt={mood} width={24} />
        </MoodCircle>
      ) : (
        <NoRecord>
          <NoRecordCircle />
        </NoRecord>
      )}
    </CellWrapper>
  );
};

const CellWrapper = styled.div<{ $dimmed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.$dimmed ? 0.2 : 1)};

  flex: 1;
  height: 46px;
`;

const DayText = styled.div<{ $isToday: boolean }>`
  font-size: 0.625rem;
  line-height: 0.875rem;
  font-weight: ${({ $isToday }) => ($isToday ? '600' : '400')};
  letter-spacing: -1%;
  color: ${({ $isToday }) => ($isToday ? '#00AFD8' : '#a5b7c6')};
`;

const MoodCircle = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;

  width: 32px;
  height: 32px;

  border-radius: 50%;
  background-color: ${(props) => props.$color};

  cursor: pointer;
`;

const NoRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;
const NoRecordCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e8ecef;
`;
