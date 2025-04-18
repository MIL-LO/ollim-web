'use client';

import React, { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import TopNavigation from '@/components/navigation/TopNavigation';
import styled from 'styled-components';
import { TabMenu } from '@/components/pages/view/TabMenu';
import { Calendar } from '@/components/pages/view/calendar/Calendar';
import Collection from '@/components/pages/view/collection/Collection';

/* ------------------------------------------------------------
 * 페이지
 * ------------------------------------------------------------ */
const tabs = ['캘린더', '콜렉션'] as const;
type Tab = (typeof tabs)[number];

export default function ViewPage() {
  const [selectedTab, setSelectedTab] = useState<'캘린더' | '콜렉션'>('캘린더');

  return (
    <MobileLayout>
      <TopNavigation />
      <Contents>
        <TabMenu selectedTab={selectedTab} onTabChange={setSelectedTab} />
        {selectedTab === '캘린더' ? (
          <>
            <Calendar />
          </>
        ) : (
          <Collection />
        )}
      </Contents>
    </MobileLayout>
  );
}

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  height: 100%;
`;
