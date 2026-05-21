import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ className = '', children, ...props }: ButtonProps) {
  return (
    <button type="button" className={`btn ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
