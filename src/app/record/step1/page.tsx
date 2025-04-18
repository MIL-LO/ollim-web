// src/app/record/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { emotionRecordState } from '@/atoms/recordAtoms';
import {
  Header,
  Subtitle,
  Label,
  EmotionList,
  EmotionOption,
  EmotionContent,
  EmotionIcon,
  EmotionText,
} from '@/components/styles/Record.styles';

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
  const [recordData, setRecordData] = useRecoilState(emotionRecordState);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(recordData.emotion);

  useEffect(() => {
    setRecordData((prev) => ({
      ...prev,
      currentStep: 1,
    }));
  }, [setRecordData]);

  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId);
    setRecordData((prev) => ({
      ...prev,
      emotion: emotionId,
    }));
  };

  return (
    <>
      <Header>
        <Subtitle>오늘 하루 기분은 어땠어?</Subtitle>
        <Label>이제 천천히 돌아보며 선택해줘!</Label>
      </Header>

      <EmotionList>
        {emotionOptions.map((emotion) => (
          <EmotionOption
            key={emotion.id}
            selected={selectedEmotion === emotion.id}
            emotionId={emotion.id} // 감정 ID 추가
            onClick={() => handleEmotionSelect(emotion.id)}
          >
            <EmotionContent>
              {selectedEmotion === emotion.id && moodImageMap[emotion.id] && (
                <EmotionIcon>
                  <Image
                    src={`/images/${moodImageMap[emotion.id]}.png`}
                    alt={emotion.label}
                    width={48}
                    height={48}
                  />
                </EmotionIcon>
              )}
              <EmotionText
                selected={selectedEmotion === emotion.id}
                emotionId={emotion.id} // 감정 ID 추가
              >
                {emotion.label}
              </EmotionText>
            </EmotionContent>
          </EmotionOption>
        ))}
      </EmotionList>

      <button id="hidden-next-button" style={{ display: 'none' }}>
        다음
      </button>
    </>
  );
}
