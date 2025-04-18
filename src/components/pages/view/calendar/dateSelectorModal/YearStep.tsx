import styled from 'styled-components';

export const YearStep = ({
  selected,
  onSelect,
  yearRange = [2024, 2025],
}: {
  selected: string;
  onSelect: (year: string) => void;
  yearRange?: number[];
}) => {
  return (
    <YearList>
      {yearRange.map((year) => (
        <YearItem
          key={year}
          $selected={selected === String(year)}
          onClick={() => onSelect(String(year))}
        >
          {year}
        </YearItem>
      ))}
    </YearList>
  );
};
const YearList = styled.div`
  position: absolute;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const YearItem = styled.button<{ $selected: boolean }>`
  width: 100%;
  height: 44px;

  background-color: ${({ $selected }) => ($selected ? '#D2F6FF' : 'transparent')};

  text-align: center;
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  font-size: 17px;
  letter-spacing: -1%;
  color: ${({ $selected }) => ($selected ? '#00AFD8' : '#A5B7C6')};
`;
