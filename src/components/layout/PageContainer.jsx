import React from 'react';
import Header from './Header';

const PageContainer = ({
  children,
  title,
  showBack = false,
  showNotification = true,
  notificationCount = 0,
  className = ''
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        title={title}
        showBack={showBack}
        showNotification={showNotification}
        notificationCount={notificationCount}
      />
      <main className={`flex-1 p-4 overflow-y-auto ${className}`}>
        {children}
      </main>
    </div>
  );
};

export default PageContainer;