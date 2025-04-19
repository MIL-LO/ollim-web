// src/app/record/step1/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { emotionRecordState } from '@/atoms/recordAtoms';
import {
  EmotionList,
  EmotionOption,
  EmotionContent,
  EmotionIcon,
  EmotionText,
} from '@/components/styles/Record.styles';

// 명확한 타입 정의
type EmotionId = 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';

// 타입 안전한 이미지 맵핑
const moodImageMap: Record<EmotionId, string> = {
  very_happy: 'verygood',
  happy: 'good',
  neutral: 'soso',
  sad: 'bad',
  very_sad: 'toobad',
};

// 명확한 타입을 가진 옵션 배열
const emotionOptions: Array<{ id: EmotionId; label: string }> = [
  { id: 'very_happy', label: '너무 좋아' },
  { id: 'happy', label: '좋아' },
  { id: 'neutral', label: '그냥그래' },
  { id: 'sad', label: '안좋아' },
  { id: 'very_sad', label: '너무 안좋아' },
];

export default function RecordEmotionPage() {
  const router = useRouter();
  const [recordData, setRecordData] = useRecoilState(emotionRecordState);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionId | null>(
    recordData.emotion as EmotionId | null
  );

  useEffect(() => {
    setRecordData((prev) => ({
      ...prev,
      currentStep: 1,
    }));
  }, [setRecordData]);

  const handleEmotionSelect = (emotionId: EmotionId) => {
    setSelectedEmotion(emotionId);
    setRecordData((prev) => ({
      ...prev,
      emotion: emotionId,
    }));
  };

  const handleNext = () => {
    if (selectedEmotion) {
      router.push('/record/step2');
    }
  };

  return (
    <>
      <EmotionList>
        {emotionOptions.map((emotion) => (
          <EmotionOption
            key={emotion.id}
            selected={selectedEmotion === emotion.id}
            emotionId={emotion.id}
            onClick={() => handleEmotionSelect(emotion.id)}
          >
            <EmotionContent>
              {selectedEmotion === emotion.id && (
                <EmotionIcon>
                  <Image
                    src={`/images/${moodImageMap[emotion.id]}.png`}
                    alt={emotion.label}
                    width={48}
                    height={48}
                  />
                </EmotionIcon>
              )}
              <EmotionText selected={selectedEmotion === emotion.id} emotionId={emotion.id}>
                {emotion.label}
              </EmotionText>
            </EmotionContent>
          </EmotionOption>
        ))}
      </EmotionList>

      <button
        id="hidden-next-button"
        type="button"
        style={{ display: 'none' }}
        onClick={handleNext}
      >
        다음
      </button>
    </>
  );
}
