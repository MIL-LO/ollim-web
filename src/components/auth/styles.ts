// src/components/auth/styles.ts
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 10px에서 12px로 증가 */
  align-items: center;
  padding: 0 4px; /* 좌우 여백 추가 */
`;

export const Button = styled.button`
  width: 100%;
  max-width: 320px; /* 최대 너비 제한 */
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  box-sizing: border-box; /* 패딩을 포함한 크기 계산 */

  /* 작은 화면 대응 */
  @media (max-width: 400px) {
    max-width: calc(100vw - 60px); /* 화면 너비에서 여백 제외 */
    padding: 14px 18px;
    font-size: 0.95rem;
  }

  /* 매우 작은 화면 대응 (375x667) */
  @media (max-width: 375px) {
    max-width: calc(100vw - 48px); /* 더 작은 여백 */
    padding: 13px 16px;
    font-size: 0.9rem;
  }

  /* 높이가 작은 화면에서 패딩 조정 */
  @media (max-height: 667px) {
    padding: 12px 16px;
  }

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const AppleButton = styled(Button)`
  background-color: #1e293b;
  color: white;
  border: none;
`;

export const GoogleButton = styled(Button)`
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
  max-width: 320px;

  /* 작은 화면에서 폰트 크기 조정 */
  @media (max-width: 375px) {
    font-size: 0.85rem;
    max-width: calc(100vw - 48px);
  }
`;
