'use client';

import { RecoilRoot } from 'recoil';
import React from 'react';
import ToastContainer from '../common/Toast';

export default function RecoilProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ToastContainer />
      {children}
    </RecoilRoot>
  );
}
