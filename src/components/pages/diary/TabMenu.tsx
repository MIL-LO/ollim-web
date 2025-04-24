/* ViewPage 사용 컴포넌트 */
/* 탭메뉴 - (캘린더, 콜렉션) */

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

export type TabTitle = '캘린더' | '콜렉션';

export type TabItemType = {
  title: TabTitle;
  url: string;
};

const tabs: TabItemType[] = [
  { title: '캘린더', url: '/diary/calendar' },
  { title: '콜렉션', url: '/diary/collections' },
];

interface Props {
  selectedTab: TabTitle;
  onTabChange: (tab: TabItemType) => void;
}

export const TabMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (tab: TabItemType) => {
    router.push(tab.url);
  };

  return (
    <Layout>
      {tabs.map((tab) => (
        <TabItem
          key={tab.title}
          onClick={() => handleTabClick(tab)}
          $selected={pathname === tab.url}
        >
          {tab.title}
        </TabItem>
      ))}
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  margin-bottom: 16px;

  width: 100%;
  height: 44px;
`;
const TabItem = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px 10px;

  border-bottom: ${({ $selected }) => ($selected ? '2px solid #000' : 'none')};

  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -1%;
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  color: ${({ $selected }) => ($selected ? '#000' : '#A5B7C6')};
`;
