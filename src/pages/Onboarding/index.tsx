'use client';

import React, { useState } from 'react';
import { Button, Input, RadioGroup, ProgressBar, DatePicker } from '@/components/common';
import {
  PageContainer,
  ContentContainer,
  Header,
  Title,
  Subtitle,
  FormSection,
  Label,
  ButtonContainer,
  ProgressBarWrapper,
  InputRow,
  InputWrapper,
  RecommendButton,
} from './Onboarding.styles';

const OnboardingPage = () => {
  // 온보딩 단계 상태 관리
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // 사용자 입력 데이터 관리
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');

  // 다음 단계로 이동
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // 추천받기 기능
  const handleRecommend = () => {
    // 랜덤 닉네임 생성 예시
    const randomNicknames = [
      '행복한북극곰',
      '꿈꾸는바다거북',
      '명랑해달',
      '귀여운판다',
      '춤추는코끼리',
    ];
    const randomIndex = Math.floor(Math.random() * randomNicknames.length);
    setNickname(randomNicknames[randomIndex]);
  };

  // 성별 옵션
  const genderOptions = [
    { value: 'female', label: '여성' },
    { value: 'male', label: '남성' },
    { value: 'other', label: '기타' },
  ];

  // 다음 버튼 활성화 여부 결정
  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        // 모든 필수 입력 필드가 채워져야 다음 버튼 활성화
        return !nickname.trim() || !gender || !birthdate;
      default:
        return false;
    }
  };

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

        {currentStep === 1 && (
          <>
            <FormSection>
              <Label>닉네임을 입력해주세요</Label>
              <InputRow>
                <InputWrapper>
                  <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임"
                    fullWidth
                  />
                </InputWrapper>
                <RecommendButton onClick={handleRecommend}>추천받기</RecommendButton>
              </InputRow>
            </FormSection>

            <FormSection>
              <Label>성별을 선택해주세요</Label>
              <RadioGroup
                options={[
                  { value: 'female', label: '여성' },
                  { value: 'male', label: '남성' },
                  { value: 'other', label: '기타' },
                ]}
                value={gender}
                onChange={setGender}
                name="gender"
                direction="horizontal"
              />
            </FormSection>

            <FormSection>
              <Label>생년월일을 입력해주세요</Label>
              <DatePicker value={birthdate} onChange={setBirthdate} />
            </FormSection>
          </>
        )}

        {currentStep === 4 && (
          <FormSection>
            <Label>정보 확인</Label>
            <div>
              <p>닉네임: {nickname}</p>
              <p>성별: {gender === 'female' ? '여성' : gender === 'male' ? '남성' : '기타'}</p>
              <p>생년월일: {birthdate}</p>
            </div>
          </FormSection>
        )}
      </ContentContainer>

      <ButtonContainer>
        <Button variant="outline" onClick={handlePrev} fullWidth disabled={currentStep === 1}>
          {currentStep === 1 ? '건너뛰기' : '이전'}
        </Button>
        <Button variant="primary" onClick={handleNext} fullWidth disabled={isNextDisabled()}>
          {currentStep === totalSteps ? '완료' : '다음'}
        </Button>
      </ButtonContainer>
    </PageContainer>
  );
};

export default OnboardingPage;
