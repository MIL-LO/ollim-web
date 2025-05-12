import { useState } from 'react';
import styled from 'styled-components';
import { BelowTriangleSVG } from '../../../../../../public/svg/Icons';
import { YearStep } from './YearStep';
import { MonthStep } from './MonthStep';
import { WeekStep } from './WeekStep';
import { BottomSheetModal } from '../../BottomSheetModal';

interface Props {
  mode: '월간' | '주간';
  onClose: () => void;
  onComplete?: (selected: { year: string; month: string; week: string }) => void;
}
type Step = 'year' | 'month' | 'week';

const DateSelector = ({ mode, onClose, onComplete }: Props) => {
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
    <BottomSheetModal
      onClose={handleClose}
      onNext={handleNextStep}
      nextText={mode === '월간' ? '완료' : step === 'week' ? '완료' : '다음'}
      nextDisabled={!isNextEnabled}
    >
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
    </BottomSheetModal>
  );
};
export default DateSelector;

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
