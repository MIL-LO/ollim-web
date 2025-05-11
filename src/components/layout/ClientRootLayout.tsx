'use client';

import React, { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import { AppLayout } from './AppLayout';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

interface ClientLayoutProps {
  children: ReactNode;
}

const mode = 'lightMode';

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme[mode]}>
        <GlobalStyle />
        <AppLayout>{children}</AppLayout>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default ClientLayout;
