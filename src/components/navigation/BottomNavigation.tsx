'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const BottomNavigation = () => {
  const [activeItem, setActiveItem] = useState('/home');

  // 메뉴 항목 설정
  const menuItems = [
    { id: '/home', label: '홈', icon: '/images/home.png' },
    { id: '/view', label: '모아보기', icon: '/images/view.png' },
    { id: '/record', label: '감정 기록하기', primary: true, icon: '/images/record.png' },
    { id: '/stats', label: '통계', icon: '/images/stats.png' },
    { id: '/mypage', label: '마이페이지', icon: '/images/mypage.png' },
  ];

  // 메뉴 항목 클릭 핸들러
  const handleMenuClick = (path) => {
    setActiveItem(path);
    // 라우팅 로직을 넣을 자리
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
            d="M 193.5 15 L 203.5 16 L 209.5 18 Q 219.2 22.3 225 30.5 Q 228 38 234.5 42 L 243.5 47 L 252.5 49 L 390 49 L 390 160 L 0 160 L 0 49.5 L 0.5 49 L 137.5 49 L 146.5 47 L 154.5 43 L 163 34.5 Q 166.3 26.3 173.5 22 L 180.5 18 L 193.5 15 Z"
            fill="white"
          />
        </svg>
      </NavBackground>
      <BottomIndicatorArea />

      {/* 네비게이션 바 */}
      <NavBar>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            $isActive={activeItem === item.id}
            $isPrimary={item.primary}
          >
            {item.primary ? (
              <>
                <CenterButton>
                  <Image src={item.icon} alt={item.label} width={26} height={26} />
                </CenterButton>
                <PrimaryMenuLabel $isActive={activeItem === item.id}>{item.label}</PrimaryMenuLabel>
              </>
            ) : (
              <>
                <IconContainer $isActive={activeItem === item.id}>
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                </IconContainer>
                <MenuLabel $isActive={activeItem === item.id}>{item.label}</MenuLabel>
              </>
            )}
          </MenuItem>
        ))}
      </NavBar>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.div`
  position: fixed;
  bottom: -10px; /* 10px 더 아래로 내림 */
  left: 0;
  right: 0;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  height: 120px;
  z-index: 10;
  background: none;

  @media (min-width: 768px) {
    width: 100%;
    max-width: 390px;
  }
`;

const NavBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  @media (min-width: 768px) {
    svg {
      max-height: 100%;
      object-fit: cover;
    }
  }
`;

const NavBar = styled.nav`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 5;
  background: none;
  padding: 0 15px;
  gap: 30px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0.2;
  height: 100%;
  gap: 8px;
  cursor: pointer;
  padding-bottom: 25px; /* 패딩을 더 키워 텍스트가 더 아래에 위치하도록 함 */
  position: relative;
  margin-top: ${(props) => (props.$isPrimary ? '-15px' : '-30px')};
`;

const CenterButton = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #00bcd4;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -30px;
  left: 57%;
  transform: translateX(-50%);
  z-index: 20;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;

  & > span {
    margin-left: 5px;
  }
`;

const MenuLabel = styled.span`
  font-size: 12px;
  color: ${({ $isActive }) => ($isActive ? '#000000' : '#E8ECEF')};
  font-weight: ${({ $isActive }) => ($isActive ? '500' : '400')};
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
  position: relative;
  bottom: -10px; /* 텍스트를 더 아래로 내림 */
  gap: 10px;
`;

const PrimaryMenuLabel = styled(MenuLabel)`
  margin-left: 5px; // 감정 기록하기 텍스트를 위한 margin-left 추가
  margin-top: 3px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  margin-bottom: 8px;

  & > span {
    width: 20px !important;
    height: 20px !important;
  }

  filter: ${(props) =>
    props.$isActive
      ? 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
      : 'brightness(0) saturate(100%) invert(92%) sepia(4%) saturate(167%) hue-rotate(182deg) brightness(97%) contrast(92%)'};
`;

const BottomIndicatorArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background-color: #f5f5f5; // 조금 더 진한 흰색 (원하는 색상으로 조정 가능)
  z-index: 1; // NavBackground보다 위, NavBar보다 아래에 위치하도록
`;

export default BottomNavigation;
