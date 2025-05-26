'use client';

import React from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalAuthGuard } from '@/components/auth/GlobalAuthGuard';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <RecoilRoot>
          <GlobalAuthGuard>{children}</GlobalAuthGuard>
        </RecoilRoot>
      </body>
    </html>
  );
}
