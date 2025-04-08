import React from 'react';
import Card from '../ui/Card';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VisitorCard = () => {
  const navigate = useNavigate();

  return (
    <Card 
      onClick={() => navigate('/visitors')}
      className="bg-white"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Visitors</h3>
        <Users className="h-6 w-6 text-blue-500" />
      </div>
    </Card>
  );
};

export default VisitorCard;