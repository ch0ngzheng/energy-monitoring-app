import React from 'react';
import Card from '../ui/Card';

const NotificationItem = ({ title, message, timestamp, isRead }) => {
  return (
    <Card className={`bg-white ${!isRead ? 'bg-blue-50' : ''}`}>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </Card>
  );
};

export default NotificationItem;