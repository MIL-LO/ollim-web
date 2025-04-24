'use client';

import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentStepState, totalStepsState } from '@/atoms/onboardingAtoms';
import { ProgressBar } from '@/components/common';
import { useSearchParams } from 'next/navigation';
import {
  PageContainer,
  ProgressBarWrapper,
  ContentContainer,
  Header,
  Title,
  Subtitle,
} from '@/components/styles/Onboarding.styles';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
  const setTotalSteps = useSetRecoilState(totalStepsState);

  const stepFromURL = parseInt(searchParams.get('step') || '1', 10);

  useEffect(() => {
    if (!isNaN(stepFromURL)) {
      setCurrentStep(stepFromURL);
    }
    setTotalSteps(4); // 예: 총 4단계로 고정
  }, [stepFromURL, setCurrentStep, setTotalSteps]);

  return (
    <PageContainer>
      <ProgressBarWrapper>
        <ProgressBar steps={4} currentStep={currentStep} />
      </ProgressBarWrapper>

      <ContentContainer>
        <Header>
          <Title>OLLIM이 당신을 더 잘 이해하기 위해</Title>
          <Subtitle>몇가지 질문을 드릴게요!</Subtitle>
        </Header>

        {children}
      </ContentContainer>
    </PageContainer>
  );
}
