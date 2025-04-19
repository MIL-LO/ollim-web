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

// 추가된 스타일
const PageHeaderContainer = styled.div`
  margin-bottom: 25px;
  text-align: center;
  margin-top: 30px;
`;

const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

const PageSubtitle = styled.p`
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 24px 30px 24px;
  background-color: #f0fafd;
  position: fixed;
  bottom: 5px;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  z-index: 10;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.03);

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

  // 현재 단계에 따라 기본 페이지 제목과 부제목 설정
  const getDefaultTitles = () => {
    switch (currentStep) {
      case 1:
        return {
          title: '오늘 하루 기분은 어땠어?',
          subtitle: '이제 천천히 돌아보며 선택해줘!',
        };
      case 2:
        return {
          title: '오늘 하루 기분은 어땠어?',
          subtitle: '이제 천천히 돌아보며 작성해줘!',
        };
      case 3:
        return {
          title: '기록이 완료되었어요',
          subtitle: '오늘의 감정을 기록했어요',
        };
      case 4:
        return {
          title: '감정 확인',
          subtitle: '저장하기 전에 한번 더 확인해주세요',
        };
      default:
        return {
          title: '오늘 하루 기분은 어땠어?',
          subtitle: '이제 천천히 돌아보며 선택해줘!',
        };
    }
  };

  const defaultTitles = getDefaultTitles();

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
      // content 필드가 존재하는지 먼저 확인하고, 유효한 내용이 있는지 확인
      if (!recordData.content) return true;

      // recordData.content가 배열인 경우 길이 확인, 문자열인 경우 내용 확인
      if (Array.isArray(recordData.content)) {
        return recordData.content.length === 0;
      } else if (typeof recordData.content === 'string') {
        return recordData.content.trim() === '';
      }
      return true; // 다른 타입이면 버튼 비활성화
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
      <ContentContainer>
        <PageHeaderContainer>
          <PageTitle>{defaultTitles.title}</PageTitle>
          <PageSubtitle>{defaultTitles.subtitle}</PageSubtitle>
        </PageHeaderContainer>

        {children}
      </ContentContainer>
      <ButtonContainer>
        <Button
          variant="primary"
          size="large"
          fullWidth={false}
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
          다음
        </Button>
      </ButtonContainer>
    </LayoutContainer>
  );
}
