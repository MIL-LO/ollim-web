import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientRootLayout from '@/components/layout/ClientRootLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ollim Web',
  description: 'Ollim Web Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
