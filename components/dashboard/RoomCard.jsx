import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';

const RoomCard = ({ id, name, consumption, status }) => {
  const navigate = useNavigate();

  return (
    <Card 
      status={status} 
      onClick={() => navigate(`/rooms/${id}`)}
      className="bg-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{consumption} kWh</p>
        </div>
        <StatusBadge status={status} />
      </div>
    </Card>
  );
};

export default RoomCard;