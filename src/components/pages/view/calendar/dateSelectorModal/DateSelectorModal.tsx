import { useState } from 'react';
import styled from 'styled-components';
import { BelowTriangleSVG, ExitSVG } from '../../../../../../public/svg/Icons';
import { YearStep } from './YearStep';
import { MonthStep } from './MonthStep';
import { WeekStep } from './WeekStep';

interface Props {
  mode: '월간' | '주간';
  onClose: () => void;
  onComplete?: (selected: { year: string; month: string; week: string }) => void;
}
type Step = 'year' | 'month' | 'week';

const DateSelectorModal = ({ mode, onClose, onComplete }: Props) => {
  const [step, setStep] = useState<Step>('year');
  const [selected, setSelected] = useState({ year: '', month: '', week: '' });

  // 다음 버튼 활성화
  const isNextEnabled = (() => {
    switch (step) {
      case 'year':
        return !!selected.year;
      case 'month':
        return !!selected.month;
      case 'week':
        return !!selected.week;
      default:
        return false;
    }
  })();

  // 닫기 버튼
  const handleClose = () => {
    setSelected({ year: '', month: '', week: '' });
    setStep('year');
    onClose();
  };

  // 연도 선택
  const handleYearSelect = (year: string) => {
    setSelected((prev) => ({ ...prev, year }));
  };

  // 월 선택
  const handleMonthSelect = (month: string) => {
    setSelected((prev) => ({ ...prev, month }));
  };

  // 주 선택
  const handleWeekSelect = (week: number) => {
    const updated = { ...selected, week: String(week) }; // 저장은 string으로 유지
    setSelected(updated);
    onComplete?.(updated);
  };

  // 다음 단계 전환
  const handleNextStep = () => {
    if (step === 'year') {
      setStep('month');
    } else if (step === 'month') {
      if (mode === '월간') {
        onComplete?.({ ...selected, week: '1' });
      } else {
        setStep('week');
      }
    } else if (step === 'week' && selected.week) {
      onComplete?.(selected);
    }
  };

  return (
    <Layout>
      <Modal>
        <button className="exitBtn" onClick={handleClose}>
          <ExitSVG color="#04192B" />
        </button>
        <Content>
          {step !== 'year' && (
            <StepTitle>
              <button className="clickable" onClick={() => setStep('year')}>
                <span>{selected.year}년</span>
                <BelowTriangleSVG />
              </button>
              {step === 'week' && (
                <button
                  onClick={() => selected.year && setStep('month')}
                  className={step === 'week' ? 'clickable' : ''}
                >
                  <span>{selected.month ? `${selected.month}월` : '월'}</span>
                  <BelowTriangleSVG />
                </button>
              )}
            </StepTitle>
          )}

          {/* 단계에 따라 보여줄 화면 */}
          {step === 'year' && <YearStep selected={selected.year} onSelect={handleYearSelect} />}
          {step === 'month' && <MonthStep selected={selected.month} onSelect={handleMonthSelect} />}
          {step === 'week' && (
            <WeekStep
              year={Number(selected.year)}
              month={Number(selected.month) - 1}
              selectedWeek={Number(selected.week)}
              onSelect={handleWeekSelect}
            />
          )}
        </Content>
        <NextBtn onClick={handleNextStep} disabled={!isNextEnabled}>
          {mode === '월간' ? '완료' : step === 'week' ? '완료' : '다음'}
        </NextBtn>
      </Modal>
    </Layout>
  );
};
export default DateSelectorModal;

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: rgba(4, 25, 43, 0.8);
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 13px;

  padding: 13px 16px;
  z-index: 2;

  width: 100%;

  border-radius: 16px 16px 0 0;
  background-color: #fff;
  box-shadow: 0 0 20px 2px rgba(4, 25, 43, 0.1);
`;

const NextBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 44px;

  border-radius: 16px;
  background-color: ${({ disabled }) => (disabled ? '#C0EBF5' : '#00AFD8')};

  color: #fff;
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: -1%;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  min-height: 100px;
`;

const StepTitle = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 8px 0;
  text-align: center;

  button.clickable {
    display: flex;
    align-items: center;

    font-size: 17px;
    font-weight: 600;
    color: #04192b;
    cursor: pointer;
  }

  button + button {
    margin: 0 4px;
  }
`;
