'use client';

import React from 'react';
import styled from 'styled-components';
import BottomNavigation from '@/components/navigation/BottomNavigation';

export default function HomePage() {
  return (
    <HomeContainer>
      <BottomNavigation />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #00AFD8; /* 파란색 배경 활성화 */
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    z-index: 1; /* 낮은 z-index 설정 */
`;