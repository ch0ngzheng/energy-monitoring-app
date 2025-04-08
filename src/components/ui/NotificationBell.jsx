import React from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationBell = ({ count = 0 }) => {
  const navigate = useNavigate();

  return (
    <button
      className="relative p-2 rounded-full hover:bg-gray-100"
      onClick={() => navigate('/notifications')}
      aria-label="Notifications"
    >
      <Bell className="h-6 w-6 text-gray-800" />
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;