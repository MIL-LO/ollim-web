// src/atoms/recordAtoms.ts
import { atom } from 'recoil';

export interface EmotionRecordState {
  currentStep: number;
  emotion: string | null;
  content: string;
  date: string;
  collection: string;
  details?: string[];
  [key: string]: any; // 추가 속성을 위한 인덱스 시그니처
}

export const emotionRecordState = atom<EmotionRecordState>({
  key: 'emotionRecordState',
  default: {
    currentStep: 1,
    emotion: null,
    content: '',
    date: '',
    collection: '',
    details: [],
  },
});
