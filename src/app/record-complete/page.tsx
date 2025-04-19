// src/app/record-complete/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Container,
  ContentWrapper,
  MainTitle,
  SubTitle,
  CharacterImageWrapper,
  BouncingImage,
  StatText,
  NewCharacterText,
  Highlight,
  BottomSection,
  StreakCount,
  ButtonWrapper,
  RecommendButton,
  RecommendButtonText,
  SkipButton,
} from '@/components/styles/RecordComplete.styles';

// 클라이언트 사이드에서만 로드하기 위해 dynamic import 사용
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export default function RecordCompletePage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // 윈도우 크기 설정
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // 화면 크기 변경 감지
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // 페이지 로드 시 폭죽 효과 표시
    setShowConfetti(true);

    // 4초 후 폭죽 효과 숨기기
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleRecommendContent = () => {
    // 콘텐츠 추천 페이지로 이동
    router.push('/recommend');
  };

  const handleSkip = () => {
    // 홈 또는 다른 페이지로 이동
    router.push('/home');
  };

  return (
    <Container>
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width > 480 ? 480 : windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#ffdf4a', '#fd4b4b', '#4aff91', '#4acdff', '#fd4bc4', '#00afd8']}
        />
      )}

      <ContentWrapper>
        <MainTitle>감정 올리기를 완료했어요!</MainTitle>
        <SubTitle>감정 올리기를 완료했어요!</SubTitle>

        <CharacterImageWrapper>
          <BouncingImage
            src="/images/moodExpression/Moodlevel1.png"
            alt="행복한 캐릭터"
            width={150}
            height={150}
            priority
          />
        </CharacterImageWrapper>

        <StatText>
          오늘 감정을 올려서 경험치가 <Highlight>10P</Highlight> 올랐어요
        </StatText>
        <NewCharacterText>
          새로운 감정 캐릭터 <Highlight>기쁨이</Highlight>를 만나 도감에 추가했어요
        </NewCharacterText>
      </ContentWrapper>

      <BottomSection>
        <StreakCount>맞춤 콘텐츠 추천 남은 횟수 3회</StreakCount>

        <ButtonWrapper>
          <RecommendButton onClick={handleRecommendContent}>
            밀로가 감정과 맞는 콘텐츠를 추천해드릴게요!
            <RecommendButtonText>감정 맞춤 콘텐츠 확인하기</RecommendButtonText>
          </RecommendButton>
        </ButtonWrapper>

        <SkipButton onClick={handleSkip}>건너뛰기</SkipButton>
      </BottomSection>
    </Container>
  );
}
