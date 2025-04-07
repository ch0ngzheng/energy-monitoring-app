import React from 'react';

const IconButton = ({ 
  icon: Icon, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ariaLabel = 'icon button'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-transparent hover:bg-gray-200 text-gray-800';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-1';
      case 'md':
        return 'p-2';
      case 'lg':
        return 'p-3';
      default:
        return 'p-2';
    }
  };

  return (
    <button
      type="button"
      className={`rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
    </button>
  );
};

export default IconButton;