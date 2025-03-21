'use client';

import styled from 'styled-components';
import * as Sentry from '@sentry/nextjs';
import { useState, useEffect } from 'react';

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Sentry 초기화 상태 확인 (안전하게 접근)
    console.log('Sentry 버전:', Sentry.SDK_VERSION);
    console.log('Sentry가 로드됨:', !!Sentry);
  }, []);

  const handleTestError = () => {
    console.log('Sentry 테스트 시작...');

    try {
      // 의도적으로 오류 발생
      console.log('오류 발생 시도...');
      throw new Error('Sentry 테스트 오류 - ' + new Date().toISOString());
    } catch (error) {
      if (error instanceof Error) {
        console.log('오류 캡처 중...', error.message);

        // 이벤트 ID 확인
        const eventId = Sentry.captureException(error);
        console.log('Sentry 이벤트 ID:', eventId);

        setErrorMessage(`오류가 Sentry로 전송됨 (이벤트 ID: ${eventId})`);
      }
    }
  };

  // 테스트 메시지 캡처도 시도해봅시다
  const handleTestMessage = () => {
    const eventId = Sentry.captureMessage("테스트 메시지 - " + new Date().toISOString(), {
      level: "info"
    });
    console.log('Sentry 메시지 이벤트 ID:', eventId);
    setErrorMessage(`메시지가 Sentry로 전송됨 (이벤트 ID: ${eventId})`);
  };

  return (
    <Main>
      <Title>Ollim Web</Title>
      <Description>
        Welcome to Ollim Web - Your project is now set up with Next.js, TypeScript, PWA, Styled-components, and Recoil!
      </Description>

      <TestSection>
        <TestButton onClick={handleTestError}>
          Sentry 오류 테스트
        </TestButton>
        <TestButton onClick={handleTestMessage} style={{marginTop: '10px', backgroundColor: '#4CAF50'}}>
          Sentry 메시지 테스트
        </TestButton>
        {errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        <InfoText>
          테스트 후 <a href="https://sentry.io" target="_blank" rel="noopener noreferrer">Sentry 대시보드</a>에서 이벤트를 확인하세요.
        </InfoText>
        <InfoText>
          또는 <a href="/sentry-example-page" style={{color: '#0070f3'}}>Sentry 예제 페이지</a>를 방문하세요.
        </InfoText>
      </TestSection>
    </Main>
  );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-size: 1.2rem;
    text-align: center;
    max-width: 600px;
    margin-bottom: 2rem;
`;

const TestSection = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TestButton = styled.button`
    background-color: #0070f3;
    color: white;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0050c3;
    }
`;

const ErrorMessage = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    background-color: #ffebee;
    color: #d32f2f;
    border-radius: 0.25rem;
    max-width: 400px;
    text-align: center;
`;

const InfoText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
`;
