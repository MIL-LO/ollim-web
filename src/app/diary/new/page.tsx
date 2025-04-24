'use client';

import Complete from '@/components/pages/diary/new/Complete';
import Step1 from '@/components/pages/diary/new/Step1';
import Step2 from '@/components/pages/diary/new/Step2';
import Step3 from '@/components/pages/diary/new/Step3';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function DiaryNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = searchParams.get('step');
  const totalSteps = 4;

  // 쿼리 파라미터가 없는 경우 => 자동 이동
  useEffect(() => {
    if (!step) {
      router.replace('/diary/new?step=1');
    }
  }, [step, router]);

  if (!step) return null;

  if (Number(step) < 1 || Number(step) > totalSteps) {
    router.replace('/diary/new?step=1');
    return null;
  }

  const renderStep = () => {
    switch (step) {
      case '1':
        return <Step1 />;
      case '2':
        return <Step2 />;
      case '3':
        return <Step3 />;
      case '4':
        return <Complete />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
