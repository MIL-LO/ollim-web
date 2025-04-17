'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { IoChevronBack } from 'react-icons/io5';
import { emotionRecordState } from '@/atoms/recordAtoms';
import {
  PageContainer,
  HeaderContainer,
  BackButton,
  Title,
  ProgressBarWrapper,
  ContentContainer,
  Header,
  Subtitle,
  FormSection,
  Label,
  EmotionButtonsContainer,
  EmotionButton,
  ButtonText,
  ButtonContent,
  ImageWrapper,
  ButtonContainer,
} from './styles';
import { Button } from '@/components/common';
import ProgressBar from '@/components/common/ProgressBar'; // 새로운 ProgressBar 컴포넌트 import

// 이미지 파일명 맵핑
const moodImageMap = {
  very_happy: 'verygood',
  happy: 'good',
  neutral: 'soso',
  sad: 'bad',
  very_sad: 'toobad',
};

const emotionOptions = [
  { id: 'very_happy', label: '너무 좋아' },
  { id: 'happy', label: '좋아' },
  { id: 'neutral', label: '그냥그래' },
  { id: 'sad', label: '안좋아' },
  { id: 'very_sad', label: '너무 안좋아' },
];

export default function RecordEmotionPage() {
  const router = useRouter();
  const [recordData, setRecordData] = useRecoilState(emotionRecordState);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(recordData.emotion);

  // 컴포넌트 마운트 시 현재 단계 업데이트
  useEffect(() => {
    setRecordData((prev) => ({
      ...prev,
      currentStep: 1,
    }));
  }, [setRecordData]);

  const handleBack = () => {
    router.back();
  };

  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId);
  };

  const handleNext = () => {
    if (selectedEmotion) {
      // Recoil 상태 업데이트
      setRecordData((prev) => ({
        ...prev,
        emotion: selectedEmotion,
      }));

      // 다음 단계로 이동
      router.push('/record/detail');
    }
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <BackButton onClick={handleBack}>
          <IoChevronBack size={24} />
        </BackButton>
        <Title>감정 기록하기</Title>
      </HeaderContainer>

      <ProgressBarWrapper>
        {/* 새로운 ProgressBar 컴포넌트 사용 */}
        <ProgressBar steps={5} currentStep={1} />
      </ProgressBarWrapper>

      <ContentContainer>
        <Header>
          <Subtitle>오늘 하루 기분은 어땠어?</Subtitle>
          <Label>이제 천천히 돌아보며 선택해줘!</Label>
        </Header>

        <FormSection>
          <EmotionButtonsContainer>
            {emotionOptions.map((emotion) => (
              <EmotionButton
                key={emotion.id}
                selected={selectedEmotion === emotion.id}
                onClick={() => handleEmotionSelect(emotion.id)}
                emotionId={emotion.id}
              >
                <ButtonContent>
                  {selectedEmotion === emotion.id && (
                    <ImageWrapper>
                      <Image
                        src={`/images/${moodImageMap[emotion.id]}.png`}
                        alt={emotion.label}
                        width={48}
                        height={48}
                      />
                    </ImageWrapper>
                  )}
                  <ButtonText selected={selectedEmotion === emotion.id} emotionId={emotion.id}>
                    {emotion.label}
                  </ButtonText>
                </ButtonContent>
              </EmotionButton>
            ))}
          </EmotionButtonsContainer>
        </FormSection>
      </ContentContainer>

      <ButtonContainer>
        <Button
          variant="primary"
          size="large"
          fullWidth={false}
          onClick={handleNext}
          disabled={!selectedEmotion}
          style={{ width: '356px', height: '44px' }}
        >
          다음
        </Button>
      </ButtonContainer>
    </PageContainer>
  );
}
