import React from 'react';
import styled from 'styled-components';

const LoginButtons: React.FC = () => {
  const handleAppleLogin = () => {
    console.log('Apple 로그인 시도');
    // 애플 로그인 처리 로직
  };

  const handleGoogleLogin = () => {
    console.log('Google 로그인 시도');
    // 구글 로그인 처리 로직
  };

  return (
    <ButtonContainer>
      <AppleButton onClick={handleAppleLogin}>Apple로 시작하기</AppleButton>
      <GoogleButton onClick={handleGoogleLogin}>Google로 시작하기</GoogleButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 320px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const AppleButton = styled(Button)`
  background-color: #1e293b;
  color: white;
  border: none;
`;

const GoogleButton = styled(Button)`
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
`;

export default LoginButtons;
