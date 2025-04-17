import { MoodKey } from '@/constants/moodMap';

export interface DiaryEntry {
  date: string; //yyyy-mm-dd
  mood: MoodKey;
  content: string;
}
export const diaryMockData: DiaryEntry[] = [
  {
    date: '2025-03-01',
    mood: 'moodLevel3',
    content: '그럭저럭한 하루였어요.',
  },
  {
    date: '2025-03-03',
    mood: 'moodLevel2',
    content: '기분 좋은 일들이 있었어요!',
  },
  {
    date: '2025-03-04',
    mood: 'moodLevel1',
    content: '너무 행복한 하루 💙',
  },
  {
    date: '2025-04-14',
    mood: 'moodLevel5',
    content: '기운이 좀 없던 날이었어요.',
  },
  {
    date: '2025-04-17',
    mood: 'moodLevel2',
    content: '괜찮았던 하루 :)',
  },
];

// 캘린더용 데이터 변환
export const moodMockData: Record<string, MoodKey> = diaryMockData.reduce(
  (acc, item) => {
    acc[item.date] = item.mood;
    return acc;
  },
  {} as Record<string, MoodKey>
);
