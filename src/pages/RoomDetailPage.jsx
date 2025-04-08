import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomData } from '../hooks/useEnergyData';
import { useUnreadNotificationsCount } from '../src/hooks/useNotificationData';
import PageContainer from '../../components/layout/PageContainer';
import Card from '../../components/ui/Card';
import { formatEnergy } from '../utils/statusUtils';

// Placeholder image components
const ConsumptionChartPlaceholder = () => (
  <div className="bg-gray-200 rounded-lg flex items-center justify-center h-40 mb-6">
    <span className="text-gray-500 text-sm">Consumption chart</span>
  </div>
);

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const { roomData, loading } = useRoomData(roomId);
  const { count: notificationCount } = useUnreadNotificationsCount();
  
  // Mock data for development until Firebase is fully set up
  const mockRoomData = {
    id: roomId,
    name: 'Room A',
    consumption: 145,
    status: 'Sub-optimal',
    appliances: [
      { id: '1', name: 'Desk Lamp', status: 'on', consumption: 15 },
      { id: '2', name: 'Toilet Lights', status: 'off', consumption: 0 },
      { id: '3', name: 'Room Lights', status: 'on', consumption: 35 }
    ]
  };
  
  // Use mock data if loading or no data available
  const data = loading || !roomData ? mockRoomData : roomData;
  
  // State for appliance switches
  const [applianceStatus, setApplianceStatus] = useState(
    data.appliances.reduce((acc, appliance) => {
      acc[appliance.id] = appliance.status === 'on';
      return acc;
    }, {})
  );
  
  const toggleAppliance = (id) => {
    setApplianceStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // Here you would update the Firebase database as well
    console.log(`Toggling appliance ${id} to ${!applianceStatus[id] ? 'on' : 'off'}`);
  };

  return (
    <PageContainer 
      title={data.name} 
      showBack={true}
      notificationCount={notificationCount}
    >
      <ConsumptionChartPlaceholder />
      
      <Card className="bg-white mb-6">
        <h3 className="text-base font-medium mb-3">Consumption</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current:</span>
            <span className="text-sm font-medium">{formatEnergy(data.consumption)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`text-sm font-medium ${
              data.status === 'Optimal' ? 'text-green-600' : 
              data.status === 'Sub-optimal' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {data.status}
            </span>
          </div>
        </div>
      </Card>
      
      <h3 className="text-lg font-semibold mb-4">Appliances</h3>
      <div className="grid grid-cols-2 gap-4">
        {data.appliances.map((appliance) => (
          <div key={appliance.id} className="bg-white rounded-lg shadow p-3 flex flex-col items-center">
            <span className="text-sm mb-2">{appliance.name}</span>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={applianceStatus[appliance.id]}
                onChange={() => toggleAppliance(appliance.id)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-xs font-medium">
                {applianceStatus[appliance.id] ? 'ON' : 'OFF'}
              </span>
            </label>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default RoomDetailPage;