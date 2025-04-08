import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NotificationBell from '../ui/NotificationBell';

const Header = ({ title, showBack = false, showNotification = true, notificationCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      {showNotification && <NotificationBell count={notificationCount} />}
    </header>
  );
};

export default Header;