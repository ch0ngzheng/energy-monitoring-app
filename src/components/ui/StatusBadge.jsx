import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-500';
      case 'sub-optimal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-500';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-500';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-500';
    }
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;