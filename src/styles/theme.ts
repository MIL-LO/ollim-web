// src/styles/theme.ts

// ============================================
// - 색상 디자인 토큰 정의
// - 테마 설정 파일 (임시: Light/Dark 모드 | 현재는 테마 없음)
// - styled-components의 ThemeProvider에서 사용됨
// ============================================

'use client';

// Light 모드 테마 정의
const lightTheme = {
  colors: {
    BG1_Main: '#00AFD8',
    BG2: '#D2F6FF',
    BG3: '#F0FAFD',
    BG4: '#146E96',
    BG5: '#254A7E',
    BG6_Gray: '#E8ECEF',
    BG7_Disable: '#C0EBF5',

    TXT1_Main: '#04192B',
    TXT2: '#103151',
    TXT3: '#FFF',
    TXT4_Gray: '#A5B7C6',
  },
};

// Dark 모드 테마 정의
const darkTheme = {
  colors: {
    BG1_Main: '#00AFD8',
    BG2: '#D2F6FF',
    BG3: '#F0FAFD',
    BG4: '#146E96',
    BG5: '#254A7E',
    // BG6_Gray: '#E8ECEF',

    TXT1_Main: '#04192B',
    TXT2: '#103151',
    TXT3: '#FFF',
    // TXT4_Gray: '#A5B7C6',
  },
};

export const theme = {
  lightMode: lightTheme,
  darkMode: darkTheme,
};

export type Theme = typeof lightTheme;
