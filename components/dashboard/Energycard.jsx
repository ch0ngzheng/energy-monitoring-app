import React from 'react';
import Card from '../ui/Card';
import { Zap } from 'lucide-react';

const EnergyCard = ({ title, value, icon: Icon = Zap, iconColor = 'text-yellow-500' }) => {
  return (
    <Card className="bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-600">{title}</h3>
          <p className="text-lg font-semibold">{value}</p>
        </div>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
    </Card>
  );
};

export default EnergyCard;