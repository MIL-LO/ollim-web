'use client';

import React from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

const RootLayout = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <RecoilRoot>
        <div className="app-container">{children}</div>
      </RecoilRoot>
    </StyledComponentsRegistry>
  );
};

export default RootLayout;
