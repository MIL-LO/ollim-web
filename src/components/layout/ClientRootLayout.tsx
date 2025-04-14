'use client';

import React, { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <RecoilRoot>
        <div className="app-container">{children}</div>
      </RecoilRoot>
    </StyledComponentsRegistry>
  );
};

export default ClientLayout;
