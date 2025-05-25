// components/common/Button/PageButton.tsx

// 사용부분 : 페이지버튼, 모달버튼, 로그인버튼
// 디자인유형 : darkBlue, lightBlue, gray, 사용자커스텀(color, hoverBgColor, bgColor, width, height 등)

'use client';

import { colorGuide } from '@/styles/colorGuide';
import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  title: string; //버튼제목
  design?: 'darkBlue' | 'lightBlue' | 'gray'; //디자인색상유형
  width?: string; //버튼너비(기본 width:100%)
  height?: string; //버튼높이(기본 height:44px)
  bgColor?: string; //버튼배경색
  hoverBgColor?: string; //hover버튼배경색
  color?: string; //버튼글자색

  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const PageButton = ({
  title,
  design = 'darkBlue',
  width = '100%',
  height = '44px',
  bgColor,
  hoverBgColor,
  color = '#fff',

  onClick,
  disabled = false,
  type = 'button',
}: Props) => {
  return (
    <StyledButton
      $design={design}
      $width={width}
      $height={height}
      $bgColor={bgColor}
      $hoverBgColor={hoverBgColor}
      $color={color}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {title}
    </StyledButton>
  );
};

export default PageButton;

type StyledButtonProps = {
  $design: Props['design'];
  $width: Props['width'];
  $height: Props['height'];
  $bgColor: Props['bgColor'];
  $hoverBgColor: Props['hoverBgColor'];
  $color: Props['color'];
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  border-radius: 16px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${({ $design, $bgColor, $hoverBgColor, $color }) => {
    switch ($design) {
      case 'darkBlue':
        return css`
          background-color: ${colorGuide.Bg1_Main};
          color: #fff;
          border: none;

          &:hover {
            background-color: ${colorGuide.Bg1_Main};
            background-color: ${{ $hoverBgColor }}; //[TODO: 색상 설정필요]
          }

          &:disabled {
            background-color: ${colorGuide.Bg6_Disable};
            cursor: not-allowed;
          }
        `;
      case 'lightBlue':
        return css`
          background-color: ${colorGuide.Bg2};
          color: ${colorGuide.Bg1_Main};
          border: none;

          &:hover {
            background-color: ${colorGuide.Bg2};
          }

          &:disabled {
            color: ${colorGuide.Txt4_White};
            background-color: ${colorGuide.Bg2};
            cursor: not-allowed;
          }
        `;
      case 'gray':
        return css`
          background-color: ${colorGuide.Bg7_Gray};
          color: ${colorGuide.Txt3_Gray};

          &:hover {
            background-color: #f5f5f5;
          }

          &:disabled {
            cursor: not-allowed;
          }
        `;
    }
  }}
`;
