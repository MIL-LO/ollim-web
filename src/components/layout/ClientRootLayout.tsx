'use client';

import React from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

const ClientRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <RecoilRoot>
        {children}
      </RecoilRoot>
    </StyledComponentsRegistry>
  );
};

export default ClientRootLayout;