import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/layout/ClientLayout';
import RecoilProvider from '@/components/providers/RecoilProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ollim Web',
  description: 'Ollim Web Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RecoilProvider>
          <ClientLayout>{children}</ClientLayout>
        </RecoilProvider>
      </body>
    </html>
  );
}
