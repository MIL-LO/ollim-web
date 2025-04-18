import { MONTHS } from '@/constants/days';
import styled from 'styled-components';

export const MonthStep = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) => {
  return (
    <MonthGrid>
      {MONTHS.map((month) => (
        <MonthItem key={month} $selected={selected === month} onClick={() => onSelect(month)}>
          {month}월
        </MonthItem>
      ))}
    </MonthGrid>
  );
};
const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-row-gap: 16px;
  justify-content: center;

  padding-bottom: 12px;
`;

const MonthItem = styled.button<{ $selected: boolean }>`
  width: 60px;
  height: 44px;

  border-radius: 16px;
  background-color: ${({ $selected }) => ($selected ? '#D2F6FF' : 'transparent')};

  color: ${({ $selected }) => ($selected ? '#00AFD8' : '#A5B7C6')};
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  font-size: 1.0625rem;
`;
