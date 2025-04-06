import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'subtle';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: React.ElementType | 'a' | 'button' | typeof Link;
  to?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  as: Component = 'button',
  to,
  href,
  ...rest
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 active:from-indigo-700 active:to-purple-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none',
    text: 'hover:bg-indigo-50 active:bg-indigo-100 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none',
    subtle: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:bg-indigo-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none'
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  // Handle Link component
  if (Component === Link && to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  
  // Handle anchor tag
  if (Component === 'a' && href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  
  // Default button
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button; 