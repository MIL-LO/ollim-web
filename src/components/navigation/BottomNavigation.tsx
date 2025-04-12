'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>('/home');

  // 메뉴 항목 설정
  const menuItems = [
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
                  width={30}
                  height={30}
                />
              </CenterButton>
            ) : (
              <>
                <IconContainer active={activeItem === item.id}>
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
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
    height: 80px;
    z-index: 10;
`;

const NavBar = styled.nav`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    padding: 0 10px;
`;

const MenuItem = styled.div<{ active: boolean; isPrimary?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    cursor: pointer;
    padding-bottom: ${props => props.isPrimary ? '0' : '10px'};
    position: relative;
`;

const CenterButton = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #00BCD4;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    & > span {
        width: 30px !important;
        height: 30px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }
`;

const IconContainer = styled.div<{ active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-bottom: 4px;

    & > span {
        width: 24px !important;
        height: 24px !important;
    }

    filter: ${props => props.active
            ? 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
            : 'brightness(0) saturate(100%) invert(47%) sepia(9%) saturate(0%) hue-rotate(186deg) brightness(88%) contrast(85%)'};
`;

const MenuLabel = styled.span<{ active: boolean }>`
    font-size: 12px;
    color: ${({ active }) => (active ? '#000000' : '#767676')};
    font-weight: ${({ active }) => (active ? '500' : '400')};
`;

export default BottomNavigation;