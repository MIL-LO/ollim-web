// [TODO_한빈: 나중에하기 모달 버튼 이벤트 연결]

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { onboardingDataState, currentStepState } from '@/atoms/onboardingAtoms';
import { Input, RadioGroup } from '@/components/common';
import PageButton from '@/components/common/Button/PageButton';
import {
  FormSection,
  Label,
  InputRow,
  InputWrapper,
  RecommendButton,
  ButtonContainer,
} from '@/components/styles/Onboarding.styles';
import { ConfirmModal } from '@/components/common/Modal';

export default function Step1() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingDataState);
  const [isContinueModal, setIsContinueModal] = useState<boolean>(false);
  const setCurrentStep = useSetRecoilState(currentStepState);

  // 로컬 상태 (폼 제어용)
  const [nickname, setNickname] = useState(onboardingData.nickname);
  const [gender, setGender] = useState(onboardingData.gender);
  const [birthdate, setBirthdate] = useState(onboardingData.birthdate);

  // 컴포넌트 마운트 시 현재 단계 업데이트
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  // 다음 단계로 이동
  const handleNext = () => {
    // Recoil 상태 업데이트
    setOnboardingData({
      ...onboardingData,
      nickname,
      gender,
      birthdate,
    });

    // 다음 페이지로 이동
    router.push('/onboarding?step=2');
  };

  // 건너뛰기 (선택 사항 스킵)
  const handleSkip = () => {
    router.push('/onboarding?step=2');
  };

  // 추천받기 기능
  const handleRecommend = () => {
    // 랜덤 닉네임 생성
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

  // 입력 형식 가이드 (예: YYYY-MM-DD)
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  // 다음 버튼 활성화 여부
  const isNextDisabled = !nickname.trim() || !gender || !birthdate;

  return (
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
          options={genderOptions}
          value={gender}
          onChange={setGender}
          name="gender"
          direction="horizontal"
        />
      </FormSection>

      <FormSection>
        <Label>생년월일을 입력해주세요</Label>
        <Input
          type="text"
          value={birthdate}
          onChange={handleBirthdateChange}
          placeholder="YYYY-MM-DD"
          fullWidth
        />
      </FormSection>

      <ButtonContainer>
        <PageButton title="나중에 하기" design="gray" onClick={() => setIsContinueModal(true)} />
        <PageButton title="다음" design="darkBlue" onClick={handleNext} disabled={isNextDisabled} />
      </ButtonContainer>

      {isContinueModal && (
        <ConfirmModal
          title="나중에 하시겠습니까?"
          descript={
            <>
              <p>지금까지 작성한 정보는 사라져요!</p>
              <p>나중에 마이페이지에서 다시 설정할 수 있어요</p>
            </>
          }
          onClose={() => setIsContinueModal(false)}
          yesBtn={
            <PageButton title="나중에 할래요" onClick={() => router.push('/home')}></PageButton>
          }
          noBtn={<PageButton title="지금 할래요" design="gray"></PageButton>}
        ></ConfirmModal>
      )}
    </>
  );
}
