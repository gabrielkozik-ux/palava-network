import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-wine-900/80 ml-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-wine-900/40">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-2 focus:ring-wine-500 focus:border-wine-500 block p-3 ${icon ? 'pl-10' : ''} shadow-sm transition-colors placeholder:text-gray-400 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-wine-900/80 ml-1">{label}</label>
      <textarea
        className={`w-full bg-white border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-2 focus:ring-wine-500 focus:border-wine-500 block p-3 shadow-sm transition-colors placeholder:text-gray-400 min-h-[100px] resize-none ${className}`}
        {...props}
      />
    </div>
  );
};