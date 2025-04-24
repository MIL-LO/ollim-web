'use client';

import React, { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import { AppLayout } from './AppLayout';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <AppLayout>{children}</AppLayout>
    </StyledComponentsRegistry>
  );
};

export default ClientLayout;
