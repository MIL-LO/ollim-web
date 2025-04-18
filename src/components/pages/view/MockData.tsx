import { MoodKey } from '@/constants/moodMap';

/* -------------------------------------------------
 * 다이어리 목업 데이터
 * -------------------------------------------------*/
export interface DiaryEntry {
  id: string;
  date: string; //yyyy-mm-dd
  mood: MoodKey;
  content: string;
  collection_id: string;
  liked: boolean;
}

export const diaryMockData: DiaryEntry[] = [
  {
    id: '1',
    date: '2025-03-01',
    mood: 'moodLevel3',
    content: '그럭저럭한 하루였어요.',
    collection_id: '1',
    liked: false,
  },
  {
    id: '2',
    date: '2025-03-03',
    mood: 'moodLevel2',
    content: '기분 좋은 일들이 있었어요!',
    collection_id: '1',
    liked: true,
  },
  {
    id: '3',
    date: '2025-03-04',
    mood: 'moodLevel1',
    content: '너무 행복한 하루 💙',
    collection_id: '2',
    liked: true,
  },
  {
    id: '4',
    date: '2025-04-14',
    mood: 'moodLevel5',
    content: '기운이 좀 없던 날이었어요.',
    collection_id: '2',
    liked: false,
  },
  {
    id: '5',
    date: '2025-04-17',
    mood: 'moodLevel2',
    content: '괜찮았던 하루 :)',
    collection_id: '3',
    liked: false,
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

/* -------------------------------------------------
 * 콜렉션 목업 데이터
 * -------------------------------------------------*/
export interface Collection {
  id: string;
  name: string;
  diaryCount: number;
}

export const diaryCollections: Collection[] = [
  {
    id: '0',
    name: '전체',
    diaryCount: diaryMockData.length,
  },
  {
    id: '1',
    name: '봄날 기록',
    diaryCount: diaryMockData.filter((d) => d.collection_id === '1').length,
  },
  {
    id: '2',
    name: '행복한 순간들',
    diaryCount: diaryMockData.filter((d) => d.collection_id === '2').length,
  },
  {
    id: '3',
    name: '평온한 날들',
    diaryCount: diaryMockData.filter((d) => d.collection_id === '3').length,
  },
];

// 콜렉션별 다이어리 매핑 데이터
export const diariesByCollection: Record<string, DiaryEntry[]> = diaryCollections.reduce(
  (acc, collection) => {
    acc[collection.id] =
      collection.id === '0'
        ? diaryMockData
        : diaryMockData.filter((d) => d.collection_id === collection.id);
    return acc;
  },
  {} as Record<string, DiaryEntry[]>
);
