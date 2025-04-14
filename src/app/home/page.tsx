// src/app/home/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { HomeContainer, ImageContainer, MusicIconWrapper } from './styles';

export default function HomePage() {
  return (
    <HomeContainer>
      <MusicIconWrapper>
        <Image src="/images/pause-icon.png" alt="Pause Music" width={24} height={24} />
      </MusicIconWrapper>

      <ImageContainer>
        <Image src="/images/mascot.png" alt="Mascot" width={250} height={250} priority />
      </ImageContainer>
      <BottomNavigation />
    </HomeContainer>
  );
}
