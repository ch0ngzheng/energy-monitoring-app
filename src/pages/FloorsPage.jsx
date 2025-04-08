import React from 'react';
import { useFloorsData } from '../hooks/useEnergyData';
import { useUnreadNotificationsCount } from '../src/hooks/useNotificationData';
import PageContainer from '../../components/layout/PageContainer';
import FloorCard from '../../components/dashboard/FloorCard';
import { formatEnergy } from '../utils/statusUtils';

const FloorsPage = () => {
  const { floorsData, loading } = useFloorsData();
  const { count: notificationCount } = useUnreadNotificationsCount();

  // Mock data for development until Firebase is fully set up
  const mockFloorsData = [
    { id: '1', name: '1st Floor', consumption: 120, status: 'Optimal' },
    { id: '2', name: '2nd Floor', consumption: 180, status: 'Sub-optimal' },
    { id: '3', name: '3rd Floor', consumption: 240, status: 'Critical' },
  ];

  // Use mock data if loading or no data available
  const displayData = loading || floorsData.length === 0 ? mockFloorsData : floorsData;

  return (
    <PageContainer 
      title="Floors" 
      showBack={true}
      notificationCount={notificationCount}
    >
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading floor data...</p>
        ) : (
          displayData.map((floor) => (
            <FloorCard 
              key={floor.id}
              floor={floor.name}
              consumption={formatEnergy(floor.consumption)}
              status={floor.status}
            />
          ))
        )}
      </div>
    </PageContainer>
  );
};

export default FloorsPage;