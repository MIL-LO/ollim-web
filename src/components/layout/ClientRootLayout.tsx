'use client';

import React, { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <div className="app-container">{children}</div>
    </StyledComponentsRegistry>
  );
};

export default ClientLayout;
