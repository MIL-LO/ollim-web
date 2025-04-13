import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  background-color: #f0fafd;
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 15px;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-top: 30px;
`;

export const Header = styled.div`
  margin-bottom: 45px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 17px;
  font-weight: 700;
  color: #212121;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #424242;
  text-align: center;
`;

export const FormSection = styled.div`
  margin-bottom: 32px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 16px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
  width: 358px; /* 전체 너비 고정 */
  margin: 0 auto; /* 중앙 정렬 */
`;

export const InputWrapper = styled.div`
  flex: 1; /* 남은 공간 채우기 */
`;

export const RecommendButton = styled.button`
  width: 81px; /* 버튼 너비 고정 */
  height: 40px; /* 버튼 높이 수정 */
  padding: 0;
  background-color: #e0f7fa;
  color: #00afd8;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #b2ebf2;
  }

  &:active {
    background-color: #80deea;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px 24px 24px 24px;
  border-top: 1px solid #f5f5f5;
`;
