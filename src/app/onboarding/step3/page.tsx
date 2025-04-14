// app/onboarding/step3/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { onboardingDataState, currentStepState } from '@/atoms/onboardingAtoms';
import { Button, Input } from '@/components/common';
import {
  FormSection,
  Label,
  ButtonContainer,
  MBTIOptionsContainer,
  MBTIOption,
} from '@/components/styles/Onboarding.styles';

export default function Step3() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingDataState);
  const setCurrentStep = useSetRecoilState(currentStepState);

  // 로컬 상태 (폼 제어용)
  const [mbti, setMbti] = useState(onboardingData.mbti || '');
  const [job, setJob] = useState(onboardingData.job || '');

  // 컴포넌트 마운트 시 현재 단계 업데이트
  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  // 다음 단계로 이동
  const handleNext = () => {
    // Recoil 상태 업데이트
    setOnboardingData({
      ...onboardingData,
      mbti,
      job,
    });

    // 다음 페이지로 이동
    router.push('/onboarding/step4');
  };

  // 건너뛰기 처리
  const handleSkip = () => {
    // 필요한 경우 데이터를 저장하지 않고 바로 다음 단계로 이동
    router.push('/onboarding/step4');
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    router.push('/onboarding/step2');
  };

  // MBTI 옵션들
  const mbtiOptions = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ];

  // 다음 버튼 활성화 여부
  const isNextDisabled = !mbti || !job;

  return (
    <>
      <FormSection>
        <Label>당신의 MBTI는 무엇인가요?</Label>
        <MBTIOptionsContainer>
          {mbtiOptions.map((option) => (
            <MBTIOption key={option} selected={mbti === option} onClick={() => setMbti(option)}>
              {option}
            </MBTIOption>
          ))}
        </MBTIOptionsContainer>
      </FormSection>

      <FormSection>
        <Label>당신의 직업은 무엇인가요?</Label>
        <Input
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="직업을 입력해주세요"
          fullWidth
        />
      </FormSection>

      <ButtonContainer>
        <Button variant="outline" onClick={handleSkip} fullWidth>
          건너뛰기
        </Button>
        <Button variant="primary" onClick={handleNext} fullWidth disabled={isNextDisabled}>
          완료
        </Button>
      </ButtonContainer>
    </>
  );
}
