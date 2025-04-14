// app/onboarding/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // useEffect의 콜백이 한 번만 실행되도록 함
    router.replace('/onboarding/step1');
  }, [router]);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <p>리다이렉트 중...</p>
    </div>
  );
}
