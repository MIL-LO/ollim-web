import React from 'react';
import { ProgressBarContainer, ProgressTrack, ProgressFill } from './ProgressBar.styles';

interface ProgressBarProps {
  steps: number;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  // 수정된 진행률 계산 방식
  // 첫 단계(currentStep=1)에서도 일부 진행된 것으로 표시
  const progressWidth = `${(currentStep / steps) * 100}%`;

  return (
    <ProgressBarContainer>
      <ProgressTrack>
        <ProgressFill width={progressWidth} />
      </ProgressTrack>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
