'use client';

import React from 'react';
import Image from 'next/image';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { HomeContainer, ImageContainer, MusicIconWrapper, WaveContainer, Bubble } from './styles';

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

      <BottomNavigation />
    </HomeContainer>
  );
}
