import { atom } from 'recoil';

// 온보딩 단계 상태
export const currentStepState = atom({
  key: 'currentStepState',
  default: 1,
});

// 온보딩 총 단계 수
export const totalStepsState = atom({
  key: 'totalStepsState',
  default: 4,
});

// atoms/onboardingAtoms.ts의 OnboardingData 인터페이스 수정
export interface OnboardingData {
  // 1단계: 기본 정보
  nickname: string;
  gender: string;
  birthdate: string;

  // 2단계: 활동 패턴
  activityTime: string;
  activityPattern: string;
  preferredPlaces: string[];

  // 3단계: MBTI 및 직업
  mbti: string;
  job: string;

  // 이후 단계에 필요한 데이터 필드 추가 가능
}

// 기본 온보딩 데이터의 초기값에도 추가
export const onboardingDataState = atom<OnboardingData>({
  key: 'onboardingDataState',
  default: {
    nickname: '',
    gender: '',
    birthdate: '',
    activityTime: '',
    activityPattern: '',
    preferredPlaces: [],
    mbti: '',
    job: '',
  },
});
