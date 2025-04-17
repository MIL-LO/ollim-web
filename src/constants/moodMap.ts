// 기분(매우좋음(너무좋아)-매우나쁨(너무안좋아))+이모지 맵핑

export const moodMap = {
  moodLevel1: {
    title: '너무 좋아',
    color: '#F0FAFD',
    icon: '/images/moodExpression/moodLevel1.png',
    level: 1,
  },
  moodLevel2: {
    title: '좋아',
    color: '#D2F6FF',
    icon: '/images/moodExpression/moodLevel2.png',
    level: 2,
  },
  moodLevel3: {
    title: '그냥 그래',
    color: '#00AFD8',
    icon: '/images/moodExpression/moodLevel3.png',
    level: 3,
  },
  moodLevel4: {
    title: '안좋아',
    color: '#146E96',
    icon: '/images/moodExpression/moodLevel4.png',
    level: 4,
  },
  moodLevel5: {
    title: '너무 안좋아',
    color: '#254A7E',
    icon: '/images/moodExpression/moodLevel5.png',
    level: 5,
  },
} as const;

export type MoodKey = keyof typeof moodMap;
