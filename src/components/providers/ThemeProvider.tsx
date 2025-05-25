'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme, Theme } from '@/styles/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeContextProvider');
  return context;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as ThemeMode) || 'light';
    setThemeMode(saved);
    document.documentElement.setAttribute('data-theme', saved);
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const next = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  if (!isLoaded) return null; // 로딩 중엔 렌더링 하지 않음

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledThemeProvider theme={themeMode === 'light' ? theme.lightMode : theme.darkMode}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
