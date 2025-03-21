'use client';

import styled from 'styled-components';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

export default function Home() {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTestError = () => {
    setIsLoading(true);
    try {
      // 의도적으로 오류 발생
      throw new Error('Sentry 테스트 오류: ' + new Date().toISOString());
    } catch (error) {
      if (error instanceof Error) {
        const eventId = Sentry.captureException(error);
        console.log('Sentry 이벤트 ID:', eventId);
        setTestResult(`오류가 Sentry로 전송되었습니다! (이벤트 ID: ${eventId})`);
        setIsLoading(false);
      }
    }
  };

  const handleTestMessage = () => {
    setIsLoading(true);
    const eventId = Sentry.captureMessage('Sentry 테스트 메시지: ' + new Date().toISOString());
    console.log('Sentry 메시지 이벤트 ID:', eventId);
    setTestResult(`메시지가 Sentry로 전송되었습니다! (이벤트 ID: ${eventId})`);
    setIsLoading(false);
  };

  return (
    <Main>
      <Title>Ollim Web - Development</Title>
      <Description>
        Welcome to Ollim Web development environment. This environment is set up with Next.js,
        TypeScript, PWA, Styled-components, and Recoil!
      </Description>

      <TestContainer>
        <TestHeading>Sentry 테스트</TestHeading>
        <ButtonGroup>
          <TestButton onClick={handleTestError} disabled={isLoading}>
            오류 테스트
          </TestButton>
          <TestButton onClick={handleTestMessage} disabled={isLoading} $variant="secondary">
            메시지 테스트
          </TestButton>
        </ButtonGroup>

        {testResult && <ResultMessage>{testResult}</ResultMessage>}

        <ExampleLink href="/sentry-example-page">Sentry 예제 페이지 보기</ExampleLink>
      </TestContainer>
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
  color: #3498db;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const TestHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TestButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => (props.$variant === 'secondary' ? '#27ae60' : '#3498db')};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$variant === 'secondary' ? '#219653' : '#2980b9')};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultMessage = styled.div`
  padding: 1rem;
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  margin-bottom: 1.5rem;
  width: 100%;
  border-radius: 4px;
`;

const ExampleLink = styled.a`
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }
`;
