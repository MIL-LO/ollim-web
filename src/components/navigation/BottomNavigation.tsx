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
          preserveAspectRatio="none"
        >
          <path
            d="M 193.5 15 L 203.5 16 L 209.5 18 Q 219.2 22.3 225 30.5 Q 228 38 234.5 42 L 243.5 47 L 252.5 49 L 390 49 L 390 160 L 0 160 L 0 49.5 L 0.5 49 L 137.5 49 L 146.5 47 L 154.5 43 L 163 34.5 Q 166.3 26.3 173.5 22 L 180.5 18 L 193.5 15 Z"
            fill="white"
          />
        </svg>
      </NavBackground>

      {/* 네비게이션 바 */}
      <NavBar>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            active={activeItem === item.id}
            isPrimary={item.primary}
          >
            {item.primary ? (
              <CenterButton>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={26}
                  height={26}
                />
              </CenterButton>
            ) : (
              <>
                <IconContainer active={activeItem === item.id}>
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                </IconContainer>
                <MenuLabel active={activeItem === item.id}>{item.label}</MenuLabel>
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
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    height: 160px;
    z-index: 10;
    background: none;
`;

const NavBackground = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

const NavBar = styled.nav`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 10px;
    position: absolute;
    bottom: 0;
    z-index: 5;
    background: none;
`;

const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    cursor: pointer;
    padding-bottom: ${props => props.isPrimary ? '0' : '10px'};
    position: relative;
    margin-top: -40px;
`;

const CenterButton = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #00BCD4;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    & > span {
        width: 26px !important;
        height: 26px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-bottom: 4px;

    & > span {
        width: 20px !important;
        height: 20px !important;
    }

    filter: ${props => props.active
            ? 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
            : 'brightness(0) saturate(100%) invert(92%) sepia(4%) saturate(167%) hue-rotate(182deg) brightness(97%) contrast(92%)'};
`;

const MenuLabel = styled.span`
    font-size: 12px;
    color: ${({ active }) => (active ? '#000000' : '#E8ECEF')};
    font-weight: ${({ active }) => (active ? '500' : '400')};
`;

export default BottomNavigation;