import styled from 'styled-components';
import { LeftTriangleSVG, RightTriangleSVG } from '../../../../../public/svg/Icons';

interface Props {
  year: number;
  month: number;
  week?: number;
  mode: '월간' | '주간';
  onPrev: () => void;
  onNext: () => void;
  dateSelectorOn: () => void;
}

export const CalendarNavigation = ({
  year,
  month,
  week,
  mode,
  onPrev,
  onNext,
  dateSelectorOn,
}: Props) => {
  const title = mode === '월간' ? `${year}년 ${month + 1}월` : `${year}년 ${month + 1}월 ${week}주`;

  return (
    <HeaderWrapper>
      <NavButton onClick={onPrev}>
        <LeftTriangleSVG />
      </NavButton>

      <Title onClick={dateSelectorOn}>{title}</Title>

      <NavButton onClick={onNext}>
        <RightTriangleSVG />
      </NavButton>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  width: 100%;
`;

const Title = styled.div`
  font-size: 17px;
  line-height: 24px;
  letter-spacing: -1%;
  font-weight: 700;
  color: #04192b;

  user-select: none;
  cursor: pointer;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #333;
`;
