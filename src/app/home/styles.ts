// src/app/home/styles.ts
import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00afd8;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  z-index: 1;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const MusicIconWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 40px;
  cursor: pointer;
  z-index: 10;
`;
