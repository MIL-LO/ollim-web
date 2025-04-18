'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface MobileLayoutProps {
  children: ReactNode;
  fullScreen?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, fullScreen = false }) => {
  return (
    <LayoutContainer $fullScreen={fullScreen}>
      <MobileContainer>{children}</MobileContainer>
    </LayoutContainer>
  );
};

// $ 접두사를 사용하여 transient prop으로 변경
const LayoutContainer = styled.div<{ $fullScreen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) => (props.$fullScreen ? 'transparent' : '#f5f5f5')};
  padding: ${(props) => (props.$fullScreen ? '0' : '20px')};

  @media (max-width: 480px) {
    padding: 0;
    background-color: transparent;
  }
`;

const MobileContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 480px;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* ✅ iOS 부드러운 스크롤 */
  background: linear-gradient(180deg, rgba(240, 250, 253, 1) 0%, rgba(196, 243, 255, 1) 100%);

  @media (min-width: 481px) {
    height: 90vh;
    max-height: 800px;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
`;

export default MobileLayout;
