import React, { ElementType, ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps<E extends ElementType = 'button'> = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: E;
} & ComponentPropsWithoutRef<E>;

export const Button = <E extends ElementType = 'button'>({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  as,
  ...props
}: ButtonProps<E>) => {
  const Component = as || 'button';
  
  const baseClasses = 'rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100';
  
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-purple-500 active:shadow-sm transform hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50',
    outline: 'bg-transparent border border-indigo-500 text-indigo-600 hover:bg-indigo-50',
    text: 'bg-transparent text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 shadow-none'
  };
  
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <Component className={combinedClasses} {...props}>
      {children}
    </Component>
  );
}; 