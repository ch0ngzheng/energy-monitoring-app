// src/pages/HomePage.jsx
import React from 'react';
import { useBatteryStatus } from '../hooks/useEnergyData';
import { useUnreadNotificationsCount } from '../hooks/useNotificationData';
import { useVisitorData } from '../hooks/useVisitorData';
import PageContainer from '../components/layout/PageContainer';
import BatteryStatus from '../components/dashboard/BatteryStatus';
import VisitorCard from '../components/dashboard/VisitorCard';
import { formatEnergy } from '../utils/statusUtils';

// Placeholder image component for areas that will contain charts/graphs
const PlaceholderImage = ({ className }) => (
  <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
    <span className="text-gray-500 text-sm">Chart placeholder</span>
  </div>
);

const HomePage = () => {
  const { batteryData, loading: batteryLoading } = useBatteryStatus();
  const { count: notificationCount } = useUnreadNotificationsCount();
  const { visitorData } = useVisitorData();

  return (
    <PageContainer 
      title="Home" 
      showBack={false}
      notificationCount={notificationCount}
    >
      <div className="grid grid-cols-1 gap-4">
        {/* Main content section */}
        <PlaceholderImage className="h-40 w-full" />
        
        {/* Battery and Visitors section */}
        <div className="grid grid-cols-2 gap-4">
          <BatteryStatus 
            chargingRate={batteryLoading ? 'Loading...' : formatEnergy(batteryData?.chargingRate || 0)}
            dischargingRate={batteryLoading ? 'Loading...' : formatEnergy(batteryData?.dischargingRate || 0)}
          />
          <VisitorCard />
        </div>
        
        {/* Battery details section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-base font-medium mb-3">Charging Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Charging Rate:</span>
              <span className="text-sm font-medium">
                {batteryLoading ? 'Loading...' : formatEnergy(batteryData?.chargingRate || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Discharging Rate:</span>
              <span className="text-sm font-medium">
                {batteryLoading ? 'Loading...' : formatEnergy(batteryData?.dischargingRate || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;