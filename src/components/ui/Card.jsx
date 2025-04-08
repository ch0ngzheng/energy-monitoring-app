import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  status = '', 
  onClick = null,
  border = true
}) => {
  const getStatusBorder = () => {
    if (!border) return '';
    
    switch (status.toLowerCase()) {
      case 'optimal':
        return 'border-green-500';
      case 'sub-optimal':
        return 'border-yellow-500';
      case 'critical':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div 
      className={`rounded-lg shadow-sm p-4 mb-4 ${border ? `border-2 ${getStatusBorder()}` : ''} ${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;