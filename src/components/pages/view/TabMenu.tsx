/* ViewPage 사용 컴포넌트 */
/* 탭메뉴 - (캘린더, 콜렉션) */

import { useState } from 'react';
import styled from 'styled-components';

const tabs = ['캘린더', '콜렉션'] as const;
type Tab = (typeof tabs)[number];

interface Props {
  selectedTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabMenu = ({ selectedTab, onTabChange }: Props) => {
  return (
    <Layout>
      {tabs.map((tab) => (
        <TabItem key={tab} onClick={() => onTabChange(tab)} $selected={selectedTab === tab}>
          {tab}
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
