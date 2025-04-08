import React from 'react';
import { useNotifications } from '../src/hooks/useNotificationData';
import PageContainer from '../../components/layout/PageContainer';
import NotificationItem from '../../components/dashboard/NotificationItem';
import { Bell } from 'lucide-react';
import { formatRelativeTime } from '../utils/statusUtils';

const NotificationsPage = () => {
  const { notifications, loading } = useNotifications();
  
  // Mock notifications for development until Firebase is fully set up
  const mockNotifications = [
    {
      id: '1',
      title: 'High Energy Usage',
      message: 'Office room is consuming more energy than usual.',
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      isRead: false
    },
    {
      id: '2',
      title: 'Battery Status',
      message: 'Battery capacity is below 25%. Consider reducing energy consumption.',
      timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
      isRead: true
    },
    {
      id: '3',
      title: 'Solar Panel Update',
      message: 'Solar panels are now active and generating energy.',
      timestamp: new Date(Date.now() - 6 * 3600000), // 6 hours ago
      isRead: true
    }
  ];
  
  // Use mock data if loading or no data available
  const data = loading || notifications.length === 0 ? mockNotifications : notifications;
  
  return (
    <PageContainer 
      title="Notifications" 
      showBack={true}
      showNotification={false}
    >
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold">Recent Notifications</h2>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading notifications...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No notifications available</p>
        ) : (
          <div className="space-y-4">
            {data.map((notification) => (
              <NotificationItem 
                key={notification.id}
                title={notification.title}
                message={notification.message}
                timestamp={formatRelativeTime(notification.timestamp)}
                isRead={notification.isRead}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default NotificationsPage;