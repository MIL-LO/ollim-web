'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { HomeSvg, View, Stats, Mypage, Record } from '../../../public/svg/Icons';

interface StyledProps {
  isActive?: boolean;
  isPrimary?: boolean;
  isCenter?: boolean;
}

const BottomNavigation = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('/home');

  // 메뉴 항목 클릭 핸들러
  const handleMenuClick = (path: string) => {
    setActiveItem(path);
    router.push(path);
  };

  return (
    <NavigationWrapper>
      {/* 네비게이션 바 배경 - 직사각형 */}
      <NavBackground>
        <RectBackground />
      </NavBackground>

      {/* Navbar.png 이미지 추가 - 배경 위에 조화롭게 */}
      <NavbarImageContainer>
        <Image src="/images/Navbar.png" alt="Navigation Bar" width={390} height={75} priority />
      </NavbarImageContainer>

      {/* 네비게이션 바 */}
      <NavBar>
        <MenuItemsContainer>
          {/* 메뉴 아이템들 */}
          <MenuSlot>
            <MenuItem onClick={() => handleMenuClick('/home')} isActive={activeItem === '/home'}>
              <IconContainer isActive={activeItem === '/home'}>
                <HomeSvg />
              </IconContainer>
              <MenuLabel isActive={activeItem === '/home'}>홈</MenuLabel>
            </MenuItem>
          </MenuSlot>

          <MenuSlot>
            <MenuItem onClick={() => handleMenuClick('/view')} isActive={activeItem === '/view'}>
              <IconContainer isActive={activeItem === '/view'}>
                <View />
              </IconContainer>
              <MenuLabel isActive={activeItem === '/view'}>모아보기</MenuLabel>
            </MenuItem>
          </MenuSlot>

          <MenuSlot isCenter={true}>
            <CenterItemContainer>
              <CenterButton onClick={() => handleMenuClick('/record')}>
                <Record />
              </CenterButton>
            </CenterItemContainer>
            <PrimaryMenuLabelBelow isActive={activeItem === '/record'}>
              감정 기록하기
            </PrimaryMenuLabelBelow>
          </MenuSlot>

          <MenuSlot>
            <MenuItem onClick={() => handleMenuClick('/stats')} isActive={activeItem === '/stats'}>
              <IconContainer isActive={activeItem === '/stats'}>
                <Stats />
              </IconContainer>
              <MenuLabel isActive={activeItem === '/stats'}>통계</MenuLabel>
            </MenuItem>
          </MenuSlot>

          <MenuSlot>
            <MenuItem
              onClick={() => handleMenuClick('/mypage')}
              isActive={activeItem === '/mypage'}
            >
              <IconContainer isActive={activeItem === '/mypage'}>
                <Mypage />
              </IconContainer>
              <MenuLabel isActive={activeItem === '/mypage'}>마이페이지</MenuLabel>
            </MenuItem>
          </MenuSlot>
        </MenuItemsContainer>
      </NavBar>
    </NavigationWrapper>
  );
};

export default BottomNavigation;

// 직사각형 배경 컴포넌트 - 더 높게 + 그림자 추가
const RectBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px; /* 90px에서 100px로 높이 증가 */
  background-color: #fff;
  z-index: 1;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05); /* 약간의 그림자 추가 */
  border-top-left-radius: 10px; /* 위쪽 모서리에 약간의 라운딩 */
  border-top-right-radius: 10px;
`;

// Navbar 이미지 컨테이너 - 위치 및 스타일 조정
const NavbarImageContainer = styled.div`
  position: absolute; /* fixed에서 absolute로 변경 */
  bottom: 15px; /* 위치 조정 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 0; /* 100에서 5로 변경 - 다른 요소들과 조화롭게 */
  width: 100%;
  max-width: 390px;
  text-align: center;
  margin: 0 auto;
  pointer-events: none;

  img {
    object-fit: contain;
    width: 100%;
    height: auto;
    transform: scale(0.6); /* 이미지를 약간 축소 */
  }
`;

// 스타일 컴포넌트
const MenuItemsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
  z-index: 10;
`;

const MenuSlot = styled.div<{ isCenter?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  height: ${(props) => (props.isCenter ? '0' : 'auto')};
  min-width: 20%; /* 정확히 5등분 */
  z-index: 10;
`;

const CenterItemContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -35px; /* -25px에서 -35px로 조정 - 더 높게 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 15;
`;

const NavigationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100px; /* 90px에서 100px로 높이 증가 */
  z-index: 10;
  background: none;
  margin: 0 auto;

  /* 가로 모드 대응 */
  @media (orientation: landscape) {
    height: 100px;
  }
`;

const NavBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px; /* 0에서 10px로 변경 - 약간 위로 */
  z-index: 5;
  background: none;
  padding: 0;

  @media (orientation: landscape) {
    height: 90px;
  }
`;

const MenuItem = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 2px;
  gap: 4px;
  cursor: pointer;
  position: relative;
  width: 100%;
`;

const CenterButton = styled.div`
  width: 58px; /* 52px에서 58px로 크기 증가 */
  height: 58px; /* 52px에서 58px로 크기 증가 */
  border-radius: 50%;
  background-color: #00bcd4;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15); /* 그림자 강화 */

  svg {
    width: 28px; /* 26px에서 28px로 크기 증가 */
    height: 28px; /* 26px에서 28px로 크기 증가 */
  }
`;

const IconContainer = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
  color: ${({ isActive }) => (isActive ? '#000000' : '#ccc')};

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MenuLabel = styled.span<StyledProps>`
  font-size: 11px;
  color: ${({ isActive }) => (isActive ? '#000000' : '#ccc')};
  font-weight: ${({ isActive }) => (isActive ? '500' : '400')};
  text-align: center;
  white-space: nowrap;
`;

const PrimaryMenuLabelBelow = styled.span<StyledProps>`
  text-align: center;
  font-size: 11px;
  color: #cccc;
  position: absolute;
  bottom: -49px; /* 2px에서 -14px로 변경 - 더 아래로 내림 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;
