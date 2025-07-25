
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g. text-red-600
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'text-red-600', text }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div 
        className={`animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]} ${color.replace('text-', 'border-')}`}
        style={{ borderTopColor: 'transparent' }} // Ensure transparent top for spin effect
      ></div>
      {text && <p className={`mt-3 text-sm ${color}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
