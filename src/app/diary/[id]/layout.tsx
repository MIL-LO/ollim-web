'use client';

import { media } from '@/styles/mediaQuery';
import { ReactNode } from 'react';
import styled from 'styled-components';

const DiaryIdPageLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};
export default DiaryIdPageLayout;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding: 16px;

  ${media.tablet} {
    padding: 20px;
  }
`;
