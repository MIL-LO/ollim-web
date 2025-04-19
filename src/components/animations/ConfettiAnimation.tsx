// src/components/animations/ConfettiAnimation.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// 클라이언트 사이드에서만 로드하기 위해 dynamic import 사용
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

interface ConfettiAnimationProps {
  duration?: number;
  numberOfPieces?: number;
  gravity?: number;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({
  duration = 4000,
  numberOfPieces = 200,
  gravity = 0.3,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // 윈도우 크기 설정
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // 화면 크기 변경 감지
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트 마운트 시 폭죽 효과 표시
    setShowConfetti(true);

    // 지정된 시간 후 폭죽 효과 숨기기
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, duration);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [duration]);

  if (!showConfetti) return null;

  return (
    <ReactConfetti
      width={windowDimension.width}
      height={windowDimension.height}
      recycle={false}
      numberOfPieces={numberOfPieces}
      gravity={gravity}
      colors={['#ffdf4a', '#fd4b4b', '#4aff91', '#4acdff', '#fd4bc4', '#00afd8']}
    />
  );
};

export default ConfettiAnimation;
