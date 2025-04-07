import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useUnreadNotificationsCount } from '../hooks/useNotificationData';
import PageContainer from '../components/layout/PageContainer';
import RoomCard from '../components/dashboard/RoomCard';
import { formatEnergy } from '../utils/statusUtils';

// Placeholder image component for consumption graph
const ConsumptionGraphPlaceholder = () => (
  <div className="bg-gray-200 rounded-lg flex items-center justify-center h-40 mb-6">
    <span className="text-gray-500 text-sm">Consumption graph</span>
  </div>
);

const RoomsPage = () => {
  const { count: notificationCount } = useUnreadNotificationsCount();
  const [sortBy, setSortBy] = useState('consumption');
  
  // Mock data for development until Firebase is fully set up
  const mockRooms = [
    { id: '1', name: 'Living Room', consumption: 120, status: 'Optimal' },
    { id: '2', name: 'Kitchen', consumption: 180, status: 'Sub-optimal' },
    { id: '3', name: 'Master Bedroom', consumption: 85, status: 'Optimal' },
    { id: '4', name: 'Office', consumption: 240, status: 'Critical' },
    { id: '5', name: 'Guest Room', consumption: 65, status: 'Optimal' },
  ];
  
  // Sort rooms based on selected criteria
  const sortedRooms = [...mockRooms].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'consumption') {
      return b.consumption - a.consumption;
    } else if (sortBy === 'status') {
      const statusOrder = { 'Critical': 0, 'Sub-optimal': 1, 'Optimal': 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  return (
    <PageContainer 
      title="Rooms" 
      showBack={true}
      notificationCount={notificationCount}
    >
      <ConsumptionGraphPlaceholder />
      
      <div className="mb-4">
        <div className="relative">
          <select
            className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="consumption">Sort by: Consumption</option>
            <option value="name">Sort by: Name</option>
            <option value="status">Sort by: Status</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedRooms.map((room) => (
          <RoomCard 
            key={room.id}
            id={room.id}
            name={room.name}
            consumption={formatEnergy(room.consumption)}
            status={room.status}
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default RoomsPage;