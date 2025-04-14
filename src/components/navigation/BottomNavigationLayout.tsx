'use client';

import React, { ReactNode } from 'react';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

// 레이아웃 컨테이너 스타일
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
`;

// 컨텐츠 영역 스타일
const Content = styled.main`
  flex: 1;
  padding-bottom: 80px; /* 네비게이션 바 높이만큼 여백 */
  width: 100%;
`;

interface BottomNavigationLayoutProps {
  children: ReactNode;
}

const BottomNavigationLayout: React.FC<BottomNavigationLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // 네비게이션 메뉴 항목 정의
  const menuItems = [
    { id: '/home', label: '홈', icon: '/images/home.png' },
    { id: '/view', label: '모아보기', icon: '/images/view.png' },
    { id: '/record', label: '감정 기록하기', primary: true, icon: '/images/record.png' },
    { id: '/stats', label: '통계', icon: '/images/stats.png' },
    { id: '/mypage', label: '마이페이지', icon: '/images/mypage.png' },
  ];

  return (
    <LayoutContainer>
      <Content>{children}</Content>
      <BottomNavigation items={menuItems} activeItem={pathname} />
    </LayoutContainer>
  );
};

export default BottomNavigationLayout;
