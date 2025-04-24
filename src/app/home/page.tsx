'use client';

import React from 'react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <HomeContainer>
      <MusicIconWrapper>
        <Image src="/images/pause-icon.png" alt="Pause Music" width={24} height={24} />
      </MusicIconWrapper>

      <ImageContainer>
        <Image src="/images/mascot.png" alt="Mascot" width={250} height={250} priority />

        {/* 물방울 효과 */}
        <Bubble size="8px" left="40%" delay="0s" duration="4s" />
        <Bubble size="12px" left="45%" delay="1s" duration="6s" />
        <Bubble size="6px" left="55%" delay="2s" duration="5s" />
        <Bubble size="10px" left="60%" delay="0.5s" duration="7s" />
        <Bubble size="7px" left="65%" delay="1.5s" duration="4.5s" />
      </ImageContainer>

      {/* 물결 효과 */}
      <WaveContainer />
    </HomeContainer>
  );
}

import { media } from '@/styles/mediaQuery';
import styled, { keyframes } from 'styled-components';

// 부드러운 위아래 움직임 애니메이션
const float = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
`;

// 물결 효과 애니메이션
const wave = keyframes`
    0% { background-position: 0 0; }
    100% { background-position: 100% 0; }
`;

// 물방울 애니메이션
const bubbleRise = keyframes`
    0% {
        transform: translateY(0) scale(0.8);
        opacity: 0;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        transform: translateY(-80px) scale(1.2);
        opacity: 0;
    }
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  overflow: hidden; // 애니메이션 요소가 넘치지 않도록
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  position: relative;

  img {
    animation: ${float} 6s ease-in-out infinite;
    z-index: 2;
  }
`;

const MusicIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 27px;

  z-index: 10;

  cursor: pointer;
`;

const WaveContainer = styled.div`
  position: absolute;
  bottom: 100px; // 네비게이션 바 위에 위치하도록 조정
  left: 0;
  width: 100%;
  height: 20px;
  /* background: url('/images/wave.png') repeat-x; // 물결 이미지 경로 */
  background-size: 40px 20px;
  animation: ${wave} 10s linear infinite;
  z-index: 1;
  opacity: 0.7;
`;

const Bubble = styled.div<{ size: string; left: string; delay: string; duration: string }>`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  left: ${(props) => props.left};
  bottom: 190px; // 위치 조정 가능
  animation: ${bubbleRise} ${(props) => props.duration} ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
  z-index: 3;
`;
