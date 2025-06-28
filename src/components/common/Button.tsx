import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button = styled.button<ButtonProps>`
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.5rem 1rem';
      case 'large':
        return '1rem 2rem';
      default:
        return '0.75rem 1.5rem';
    }
  }};
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${({ size }) => (size === 'large' ? '1.25rem' : '1rem')};

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? css`
          background-color: #8b5a2b;
          color: #f0f0f0;
          &:hover {
            background-color: #a67c52;
          }
          &:active {
            background-color: #6d4a2b;
          }
        `
      : css`
          background-color: transparent;
          color: #d4a76a;
          border: 2px solid #8b5a2b;
          &:hover {
            background-color: rgba(139, 90, 43, 0.1);
          }
          &:active {
            background-color: rgba(139, 90, 43, 0.2);
          }
        `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;