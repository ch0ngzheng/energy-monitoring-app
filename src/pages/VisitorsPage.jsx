import React from 'react';
import { useVisitorData } from '../hooks/useVisitorData';
import { useUnreadNotificationsCount } from '../src/hooks/useNotificationData';
import PageContainer from '../../components/layout/PageContainer';
import Card from '../../components/ui/Card';
import { Users } from 'lucide-react';

const VisitorsPage = () => {
  const { visitorData, loading } = useVisitorData();
  const { count: notificationCount } = useUnreadNotificationsCount();
  
  // Mock data for development until Firebase is fully set up
  const mockVisitorData = {
    rooms: {
      'Living Room': 3,
      'Kitchen': 2,
      'Office': 1
    },
    total: 6
  };
  
  // Use mock data if loading or no data available
  const data = loading || !visitorData ? mockVisitorData : visitorData;
  
  return (
    <PageContainer 
      title="Visitors" 
      showBack={true}
      notificationCount={notificationCount}
    >
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Visitors in:
        </h2>
        
        {Object.entries(data.rooms).map(([room, count]) => (
          <Card key={room} className="bg-white py-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium">{room}</h3>
              <span className="text-lg font-semibold">{count}</span>
            </div>
          </Card>
        ))}
        
        <Card className="bg-white mt-6 py-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium">Total Visitors</h3>
            <span className="text-lg font-semibold">{data.total}</span>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default VisitorsPage;