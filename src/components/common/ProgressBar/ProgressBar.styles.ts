import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  width: 358px;
  margin: 0;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e0f7fa; /* 밝은 청록색 배경 */
  border-radius: 2px;
  position: relative;
`;

export const ProgressFill = styled.div<{ width: string }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 4px;
  background-color: #00afd8; /* 요청하신 색상으로 변경 */
  border-radius: 2px;
  width: ${(props) => props.width};
  transition: width 0.3s ease;
`;
