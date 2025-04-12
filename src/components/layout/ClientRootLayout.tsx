// ClientRootLayout.js 또는 유사한 레이아웃 파일
'use client';

import React from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

const ClientRootLayout = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <RecoilRoot>
        <div className="app-container">
          {children}
        </div>
      </RecoilRoot>
    </StyledComponentsRegistry>
  );
};

export default ClientRootLayout;