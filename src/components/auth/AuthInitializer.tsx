import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const AuthInitializer: React.FC = () => {
  const { isLoading } = useAuth(); // 이것만으로도 초기화가 실행됨

  // 전역 에러 핸들링 등 추가 가능
  useEffect(() => {
    console.log('인증 시스템 초기화 완료');
  }, []);

  return null; // UI 렌더링 없음
};
