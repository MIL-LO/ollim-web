// BottomNavigation

'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { HomeSVG, ViewSVG, RecordSVG, StatsSVG, MypageSVG } from '../../../public/svg/Icons';

interface MenuConfig {
  path: string;
  label: string;
  icon: JSX.Element;
  isCenter?: boolean;
}

const menuItems: MenuConfig[] = [
  { path: '/home', label: '홈', icon: <HomeSVG /> },
  { path: '/view', label: '모아보기', icon: <ViewSVG /> },
  { path: '/record', label: '감정 기록하기', icon: <RecordSVG />, isCenter: true },
  { path: '/stats', label: '통계', icon: <StatsSVG /> },
  { path: '/mypage', label: '마이페이지', icon: <MypageSVG /> },
];

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 네비게이션 메뉴 클릭
  const handleClick = (path: string) => {
    if (path !== pathname) router.push(path);
  };

  return (
    <Layout>
      <RoundImage src="/images/bottomNavigationRoundBG.png" />
      <MenuContainer>
        {menuItems.map(({ path, label, icon, isCenter }) => {
          const isActive = pathname === path;
          return (
            <MenuSlot key={path} $isCenter={isCenter}>
              <MenuItem onClick={() => handleClick(path)} $isActive={isActive} $isCenter={isCenter}>
                <IconWrapper $isActive={isActive} $isCenter={isCenter}>
                  {icon}
                </IconWrapper>
                <Label $isActive={isActive}>{label}</Label>
              </MenuItem>
            </MenuSlot>
          );
        })}
      </MenuContainer>
    </Layout>
  );
};

export default BottomNavigation;

const Layout = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;

  width: 100%;

  background-color: #fff;
`;

const RoundImage = styled.img`
  position: absolute;
  top: -83px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;

  width: 250px;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;

  height: calc(44px + 34px); // 34px - 하단시스템네비바 OS 자동표시 부분 공간(safe-area)

  background-color: #fff;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`;

const MenuSlot = styled.div<{ $isCenter?: boolean }>`
  position: relative;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: end;

  flex: 1;
  padding-bottom: 34px;

  min-width: 20%;
`;

const MenuItem = styled.div<{ $isActive: boolean; $isCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const IconWrapper = styled.div<{ $isActive: boolean; $isCenter?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ $isActive }) => ($isActive ? '#04192B' : '#E8ECEF')};

  ${({ $isCenter }) =>
    $isCenter &&
    `
    width: 60px;
    height: 60px;
    margin-bottom: 8px;
  `}

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Label = styled.span<{ $isActive: boolean }>`
  font-size: 11px;
  color: ${({ $isActive }) => ($isActive ? '#04192B' : '#A5B7C6')};
  font-weight: ${({ $isActive }) => ($isActive ? 500 : 400)};
  text-align: center;
  white-space: nowrap;
`;
