'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

interface MobileLayoutProps {
  children: ReactNode;
  fullScreen?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
                                                     children,
                                                     fullScreen = false
                                                   }) => {
  // 클라이언트 사이드에서만 렌더링되도록 상태 추가
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 사이드 렌더링 중에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  return (
    <LayoutContainer fullScreen={fullScreen}>
      <MobileContainer>
        {children}
      </MobileContainer>
    </LayoutContainer>
  );
};

// 스타일 코드는 동일하게 유지
const LayoutContainer = styled.div<{ fullScreen: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${props => props.fullScreen ? 'transparent' : '#f5f5f5'};
    padding: ${props => props.fullScreen ? '0' : '20px'};

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
    overflow: hidden;
    background-color: white;

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