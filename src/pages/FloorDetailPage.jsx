import React from 'react';
import { useParams } from 'react-router-dom';
import { useFloorRooms } from '../hooks/useEnergyData';
import { useUnreadNotificationsCount } from '../src/hooks/useNotificationData';
import PageContainer from '../../components/layout/PageContainer';
import RoomCard from '../../components/dashboard/RoomCard';
import { formatEnergy } from '../utils/statusUtils';

// Placeholder image component for floor plan
const FloorPlanPlaceholder = () => (
  <div className="bg-gray-200 rounded-lg flex items-center justify-center h-40 mb-6">
    <span className="text-gray-500 text-sm">Floor plan placeholder</span>
  </div>
);

const FloorDetailPage = () => {
  const { floorId } = useParams();
  const { rooms, loading } = useFloorRooms(floorId);
  const { count: notificationCount } = useUnreadNotificationsCount();

  // Format floor number for display
  const getFloorName = () => {
    const floorNum = parseInt(floorId);
    if (isNaN(floorNum)) return floorId;
    
    const suffix = floorNum === 1 ? 'st' : floorNum === 2 ? 'nd' : floorNum === 3 ? 'rd' : 'th';
    return `Floor ${floorNum}${suffix}`;
  };

  // Mock data for development until Firebase is fully set up
  const mockRooms = [
    { id: '1', name: 'Movie Theatre', consumption: 75, status: 'Critical' },
    { id: '2', name: 'Master', consumption: 45, status: 'Sub-optimal' },
    { id: '3', name: 'Guest Room 1', consumption: 30, status: 'Optimal' },
  ];

  // Use mock data if loading or no data available
  const displayRooms = loading || rooms.length === 0 ? mockRooms : rooms;

  return (
    <PageContainer 
      title={getFloorName()} 
      showBack={true}
      notificationCount={notificationCount}
    >
      <FloorPlanPlaceholder />
      
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading rooms data...</p>
        ) : (
          displayRooms.map((room) => (
            <RoomCard 
              key={room.id}
              id={room.id}
              name={room.name}
              consumption={formatEnergy(room.consumption)}
              status={room.status}
            />
          ))
        )}
      </div>
    </PageContainer>
  );
};

export default FloorDetailPage;