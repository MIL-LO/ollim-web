// 모바일,태블릿,PC의 기본 레이아웃
'use client';

import { media } from '@/styles/mediaQuery';
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import BottomNavigation from '../navigation/BottomNavigation';
import TopNavigation from '../navigation/TopNavigation';
import { NavKebabMenuSVG, SearchSVG } from '../../../public/svg/Icons';

interface Props {
  children: ReactNode;
}

type TopNavRoute = {
  pathPrefix: string | RegExp | string[];
  title: string;
  rightIcon?: ReactNode;
  onClickRightIcon?: () => void;
};

export const AppLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  // BottomNavigation이 표시될 경로
  const showBottomNavRoutes = ['/home', '/diary/calendar', '/stats', '/mypage'];

  // TopNavigation 조건
  //   const diaryDetailRegex = /^\/diary\/\d+$/;

  const showTopNavRoutes: TopNavRoute[] = [
    {
      pathPrefix: ['/diary/calendar', '/diary/collections'],
      title: '일기 모아보기',
      rightIcon: <SearchSVG />,
      onClickRightIcon: () => router.push('/diary/search'),
    },
    {
      pathPrefix: /^\/diary\/\d+$/, // /diary/숫자
      title: '2025.03.01 기록', // [TODO]추후 동적으로 수정
      rightIcon: <NavKebabMenuSVG />,
      onClickRightIcon: () => {},
    },
    {
      pathPrefix: '/diary/search',
      title: '검색',
      onClickRightIcon: () => {},
    },
    {
      pathPrefix: '/diary/new',
      title: '감정 기록하기',
      onClickRightIcon: () => {},
    },
    {
      pathPrefix: /^\/diary\/\d+\/edit$/,
      title: '수정하기',
      onClickRightIcon: () => {},
    },
  ];

  const showBottomNav = showBottomNavRoutes.includes(pathname);

  const showTopNav = showTopNavRoutes.find(({ pathPrefix }) => {
    if (Array.isArray(pathPrefix)) {
      return pathPrefix.some((prefix) => pathname.startsWith(prefix));
    }
    return typeof pathPrefix === 'string'
      ? pathname.startsWith(pathPrefix)
      : pathPrefix.test(pathname);
  });

  const showSplashBG = pathname === '/' || pathname === '/login';
  const isHome = pathname === '/home';

  return (
    <Layout $showSplashBG={showSplashBG} $isHome={isHome}>
      <Container $showSplashBG={showSplashBG}>
        <Contents $isHome={isHome}>
          {showTopNav && (
            <TopNavigation
              title={showTopNav.title}
              rightIcon={showTopNav.rightIcon}
              onClickRightIcon={showTopNav.onClickRightIcon}
            />
          )}
          {children}
        </Contents>
        {showBottomNav && <BottomNavigation />}
      </Container>
    </Layout>
  );
};

const Layout = styled.div<{ $showSplashBG: boolean; $isHome: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  ${({ $showSplashBG }) => $showSplashBG && `background-image: url('/images/splash.png');`}

  ${media.tablet} {
    padding: ${({ $isHome }) => ($isHome ? '0' : '0 40px')};
  }

  ${media.pc} {
    padding: 20px 0;
    ${({ $showSplashBG }) => $showSplashBG && `background-image: url('/images/splashBG.png');`}
  }
`;

const Container = styled.div<{ $showSplashBG: boolean }>`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 100%;

  ${media.pc} {
    ${({ $showSplashBG }) => $showSplashBG && `background-image: url('/images/splash.svg');`}
  }

  ${media.pc} {
    width: 480px;
    height: 100%;

    border-radius: 16px;
    box-shadow: 0 0 20px 2px rgba(4, 25, 43, 0.1);
  }
`;

const Contents = styled.div<{ $isHome: boolean }>`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding-top: 44px;

  width: 100%;
  height: 100%;

  background-color: ${({ $isHome }) => ($isHome ? '#00AFD8' : 'none')};
`;
