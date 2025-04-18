'use client';

import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onClose: () => void;
  backdropColor?: string;
}

const ModalWrapper = ({ children, onClose, backdropColor = 'rgba(4, 25, 43, 0.8)' }: Props) => {
  // 화면 스크롤 막기
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // 배경 클릭 시 onClose 실행
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Backdrop style={{ backgroundColor: backdropColor }} onClick={handleBackdropClick}>
      {children}
    </Backdrop>
  );
};

export default ModalWrapper;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(4, 25, 43, 0.8);
`;
