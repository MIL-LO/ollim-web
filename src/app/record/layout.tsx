'use client';

import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
import ProgressBar from '@/components/common/ProgressBar';
import { Button } from '@/components/common';
import { useRecoilState } from 'recoil';
import { emotionRecordState } from '@/atoms/recordAtoms';

// 레이아웃 스타일 컴포넌트
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0fafd;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 120px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 0;
  position: relative;
  margin-top: 20px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 24px 30px 24px; /* 하단 패딩 줄임 */
  background-color: #f0fafd;
  position: fixed;
  bottom: 5px; /* 버튼 영역을 20px 위로 올림 */
  left: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  z-index: 50;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.03); /* 그림자 추가 */

  button {
    width: 356px !important;
    height: 44px !important;
  }

  @media (max-width: 400px) {
    padding: 16px 16px 25px 16px;
  }
`;

export default function RecordLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [recordData, setRecordData] = useRecoilState(emotionRecordState);

  // 경로에 따라 현재 단계 결정
  const getCurrentStep = () => {
    if (pathname.includes('/step1')) return 1;
    if (pathname.includes('/step2')) return 2;
    if (pathname.includes('/step3')) return 3;
    if (pathname.includes('/step4')) return 4;
    return 1;
  };

  const currentStep = getCurrentStep();

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    // 숨겨진 다음 버튼 클릭
    const nextButton = document.getElementById('hidden-next-button');
    if (nextButton) {
      nextButton.click();
    }
  };

  const isNextButtonDisabled = () => {
    if (currentStep === 1) {
      // recordData.emotion이 존재하면 버튼 활성화
      return !recordData.emotion;
    }
    if (currentStep === 2) {
      // recordData.content가 배열인 경우 길이 확인, 문자열인 경우 내용 확인
      return Array.isArray(recordData.content)
        ? recordData.content.length === 0
        : !recordData.content || recordData.content.trim() === '';
    }
    return false;
  };

  return (
    <LayoutContainer>
      <HeaderContainer>
        <BackButton onClick={handleBack}>
          <IoChevronBack size={24} />
        </BackButton>
        <Title>감정 기록하기</Title>
      </HeaderContainer>

      <ProgressBarWrapper>
        <ProgressBar steps={5} currentStep={currentStep} />
      </ProgressBarWrapper>

      <ContentContainer>{children}</ContentContainer>

      <ButtonContainer>
        <Button
          variant="primary"
          size="large"
          fullWidth={false}
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
          style={{ width: '356px', height: '44px' }}
        >
          다음
        </Button>
      </ButtonContainer>
    </LayoutContainer>
  );
}
