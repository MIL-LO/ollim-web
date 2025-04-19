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

const moodImageMap: Record<string, string> = {
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
