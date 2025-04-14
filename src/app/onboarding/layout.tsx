'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentStepState, totalStepsState } from '@/atoms/onboardingAtoms';
import { ProgressBar } from '@/components/common';
import {
  PageContainer,
  ProgressBarWrapper,
  ContentContainer,
  Header,
  Title,
  Subtitle,
} from '@/components/styles/Onboarding.styles';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  // Recoil에서 현재 단계와 총 단계 수 가져오기
  const currentStep = useRecoilValue(currentStepState);
  const totalSteps = useRecoilValue(totalStepsState);

  return (
    <PageContainer>
      <ProgressBarWrapper>
        <ProgressBar steps={totalSteps} currentStep={currentStep} />
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
