'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  NavigationWrapper,
  NavBackground,
  NavBar,
  MenuItem,
  CenterButton,
  MenuLabel,
  PrimaryMenuLabel,
  IconContainer,
  BottomIndicatorArea,
} from './styles';

// MenuItem 타입 정의 추가
interface MenuItemType {
  id: string;
  label: string;
  icon: string;
  primary?: boolean;
}

const BottomNavigation = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('/home');

  // 메뉴 항목 설정
  const menuItems: MenuItemType[] = [
    { id: '/home', label: '홈', icon: '/images/home.png' },
    { id: '/view', label: '모아보기', icon: '/images/view.png' },
    { id: '/record', label: '감정 기록하기', primary: true, icon: '/images/record.png' },
    { id: '/stats', label: '통계', icon: '/images/stats.png' },
    { id: '/mypage', label: '마이페이지', icon: '/images/mypage.png' },
  ];

  // 메뉴 항목 클릭 핸들러
  const handleMenuClick = (path: string) => {
    setActiveItem(path);
    router.push(path);
  };

  return (
    <NavigationWrapper>
      {/* 흰색 배경 - SVG 사용 */}
      <NavBackground>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 390 160"
          preserveAspectRatio="xMidYMax meet"
        >
          <path
            d="M0,75
         C30,75 60,75 70,75
         C95,75 115,78 140,65
         C165,52 170,38 190,38
         C210,38 215,52 240,65
         C265,78 285,75 320,75
         C350,75 370,75 390,75
         L390,160 L0,160 Z"
            fill="white"
          />
        </svg>
      </NavBackground>
      <BottomIndicatorArea />

      {/* 네비게이션 바 */}
      <NavBar>
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            isActive={activeItem === item.id}
            isPrimary={item.primary || false}
          >
            {item.primary ? (
              <>
                <CenterButton>
                  <Image src={item.icon} alt={item.label} width={26} height={26} />
                </CenterButton>
                <PrimaryMenuLabel isActive={activeItem === item.id}>{item.label}</PrimaryMenuLabel>
              </>
            ) : (
              <>
                <IconContainer isActive={activeItem === item.id}>
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                </IconContainer>
                <MenuLabel isActive={activeItem === item.id}>{item.label}</MenuLabel>
              </>
            )}
          </MenuItem>
        ))}
      </NavBar>
    </NavigationWrapper>
  );
};

export default BottomNavigation;
