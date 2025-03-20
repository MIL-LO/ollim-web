'use client';

import React from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

interface ClientLayoutProps {
    children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
    return (
        <RecoilRoot>
            <StyledComponentsRegistry>
                <GlobalStyle />
                {children}
            </StyledComponentsRegistry>
        </RecoilRoot>
    );
};

export default ClientLayout;
