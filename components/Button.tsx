import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-sm";
  
  const variants = {
    primary: "bg-wine-900 text-white hover:bg-wine-800 focus:ring-2 focus:ring-wine-500 focus:ring-offset-1",
    secondary: "bg-wine-100 text-wine-900 hover:bg-wine-200",
    outline: "border-2 border-wine-900 text-wine-900 hover:bg-wine-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabled || isLoading ? 'opacity-70 cursor-not-allowed active:scale-100' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};