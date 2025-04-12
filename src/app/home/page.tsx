'use client';

import React from 'react';
import styled from 'styled-components';
import BottomNavigation from '@/components/navigation/BottomNavigation';

export default function HomePage() {
  return (
    <HomeContainer>
      {/* 캐릭터 이미지를 위한 영역 */}
      <ContentArea>
        <CharacterContainer>
          {/* 추후 이미지 추가 예정 */}
        </CharacterContainer>
      </ContentArea>

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #00AFD8;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 480px;
    margin: 0 auto;
`;

const ContentArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 80px; /* 네비게이션 바 높이 + 여유 공간 */
`;

const CharacterContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;