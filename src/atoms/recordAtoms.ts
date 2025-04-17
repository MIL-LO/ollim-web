import { atom } from 'recoil';

export interface EmotionRecordState {
  currentStep: number;
  emotion: string | null;
  details: string[];
  date: string;
}

export const emotionRecordState = atom<EmotionRecordState>({
  key: 'emotionRecordState',
  default: {
    currentStep: 1,
    emotion: null,
    details: [],
    date: new Date().toISOString().split('T')[0],
  },
});
