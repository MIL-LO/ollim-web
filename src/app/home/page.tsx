'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BottomNavigation from '@/components/navigation/BottomNavigation';

export default function HomePage() {
  return (
    <HomeContainer>
      <MusicIconWrapper>
        <Image
          src="/images/pause-icon.png"
          alt="Pause Music"
          width={24}
          height={24}
        />
      </MusicIconWrapper>

      <ImageContainer>
        <Image
          src="/images/mascot.png"
          alt="Mascot"
          width={250}
          height={250}
          priority
        />
      </ImageContainer>
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

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
`;

const MusicIconWrapper = styled.div`
    position: absolute;
    top: 70px;
    left: 40px;
    cursor: pointer;
    z-index: 10;
`;