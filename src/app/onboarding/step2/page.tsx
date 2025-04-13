// app/onboarding/step2/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { onboardingDataState, currentStepState } from '@/atoms/onboardingAtoms';
import { Button, RadioGroup } from '@/components/common';
import {
  FormSection,
  Label,
  ButtonContainer,
  PlaceButtonsContainer,
  PlaceButton,
} from '@/components/styles/Onboarding.styles';

export default function Step2() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingDataState);
  const setCurrentStep = useSetRecoilState(currentStepState);

  // 로컬 상태 (폼 제어용)
  const [activityTime, setActivityTime] = useState(onboardingData.activityTime);
  const [activityPattern, setActivityPattern] = useState(onboardingData.activityPattern);
  const [preferredPlaces, setPreferredPlaces] = useState<string[]>(onboardingData.preferredPlaces);

  // 컴포넌트 마운트 시 현재 단계 업데이트
  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  // 다음 단계로 이동
  const handleNext = () => {
    // Recoil 상태 업데이트
    setOnboardingData({
      ...onboardingData,
      activityTime,
      activityPattern,
      preferredPlaces,
    });

    // 다음 페이지로 이동
    router.push('/onboarding/step3');
  };

  // 건너뛰기 처리
  const handleSkip = () => {
    // 필요한 경우 데이터를 저장하지 않고 바로 다음 단계로 이동
    router.push('/onboarding/step3');
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    router.push('/onboarding/step1');
  };

  // 선호 장소 선택 토글
  const togglePreferredPlace = (place: string) => {
    if (preferredPlaces.includes(place)) {
      setPreferredPlaces(preferredPlaces.filter((p) => p !== place));
    } else {
      if (preferredPlaces.length < 2) {
        setPreferredPlaces([...preferredPlaces, place]);
      }
    }
  };

  // 장소 옵션
  const placeOptions = [
    { value: 'home', label: '집' },
    { value: 'artcenter', label: '아르바이트' },
    { value: 'company', label: '회사' },
    { value: 'school', label: '학교' },
    { value: 'cafe', label: '카페' },
    { value: 'park', label: '공원' },
    { value: 'library', label: '도서관' },
  ];

  // 다음 버튼 활성화 여부
  const isNextDisabled = !activityTime || !activityPattern || preferredPlaces.length === 0;

  return (
    <>
      <FormSection>
        <Label>당신은 언제 더 활동적인가요?</Label>
        <RadioGroup
          options={[
            { value: 'weekday', label: '주중' },
            { value: 'weekend', label: '주말' },
          ]}
          value={activityTime}
          onChange={setActivityTime}
          name="activityTime"
          direction="horizontal"
        />
      </FormSection>

      <FormSection>
        <Label>당신은 언제 더 활발한가요?</Label>
        <RadioGroup
          options={[
            { value: 'day', label: '낮형' },
            { value: 'night', label: '밤형' },
          ]}
          value={activityPattern}
          onChange={setActivityPattern}
          name="activityPattern"
          direction="horizontal"
        />
      </FormSection>

      <FormSection>
        <Label>주로 활동하는 공간은 어디인가요? (최대 2개 선택 가능)</Label>
        <PlaceButtonsContainer>
          {placeOptions.map((option) => (
            <PlaceButton
              key={option.value}
              selected={preferredPlaces.includes(option.value)}
              onClick={() => togglePreferredPlace(option.value)}
              disabled={!preferredPlaces.includes(option.value) && preferredPlaces.length >= 2}
            >
              {option.label}
            </PlaceButton>
          ))}
        </PlaceButtonsContainer>
      </FormSection>

      <ButtonContainer>
        <Button variant="outline" onClick={handleSkip} fullWidth>
          건너뛰기
        </Button>
        <Button variant="primary" onClick={handleNext} fullWidth disabled={isNextDisabled}>
          다음
        </Button>
      </ButtonContainer>
    </>
  );
}
