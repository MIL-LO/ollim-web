'use client';

import React from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'recommend';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
