import React from 'react';
import Card from '../ui/Card';
import { Battery, BatteryMedium } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BatteryStatus = ({ chargingRate, dischargingRate }) => {
  const navigate = useNavigate();

  return (
    <Card 
      onClick={() => navigate('/battery')}
      className="bg-white"
    >
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Battery</h3>
          <Battery className="h-6 w-6 text-green-500" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Charging Rate:</span>
            <span className="text-sm font-medium">{chargingRate} kWh</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Discharging Rate:</span>
            <span className="text-sm font-medium">{dischargingRate} kWh</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BatteryStatus;