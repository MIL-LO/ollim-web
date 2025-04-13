import styled, { css } from 'styled-components';
import { ButtonProps } from './index';

type StyledButtonProps = {
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  $fullWidth: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: #00bcd4;
          color: white;
          border: none;

          &:hover {
            background-color: #00acc1;
          }

          &:disabled {
            background-color: #b2ebf2;
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return css`
          background-color: #e0f7fa;
          color: #00bcd4;
          border: none;

          &:hover {
            background-color: #b2ebf2;
          }

          &:disabled {
            color: #80deea;
            background-color: #e0f7fa;
            cursor: not-allowed;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: #9e9e9e;
          border: 1px solid #e0e0e0;

          &:hover {
            background-color: #f5f5f5;
          }

          &:disabled {
            color: #bdbdbd;
            border-color: #eeeeee;
            cursor: not-allowed;
          }
        `;
      case 'recommend':
        return css`
          background-color: #e0f7fa;
          color: #00afd8;
          border: none;
          border-radius: 16px;
          font-weight: 600;

          &:hover {
            background-color: #b2ebf2;
          }

          &:active {
            background-color: #80deea;
          }
        `;
    }
  }}

    ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          height: 36px;
          padding: 0 16px;
          font-size: 14px;
        `;
      case 'medium':
        return css`
          height: 48px;
          padding: 0 24px;
          font-size: 16px;
        `;
      case 'large':
        return css`
          height: 56px;
          padding: 0 32px;
          font-size: 18px;
        `;
      case 'xsmall':
        return css`
          height: 32px;
          padding: 0 12px;
          font-size: 12px;
        `;
    }
  }}
`;
