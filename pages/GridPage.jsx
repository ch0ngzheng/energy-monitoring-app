import React from 'react';
import { Zap, ArrowDownToLine, ArrowUpFromLine, DollarSign } from 'lucide-react';
import { useGridData } from '../hooks/useEnergyData';
import { useUnreadNotificationsCount } from '../hooks/useNotificationData';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import { formatEnergy, formatCurrency } from '../utils/statusUtils';

// Placeholder image component for grid chart
const GridChartPlaceholder = () => (
  <div className="bg-gray-200 rounded-lg flex items-center justify-center h-40 mb-6">
    <span className="text-gray-500 text-sm">Electricity purchase/sales chart</span>
  </div>
);

const GridPage = () => {
  const { gridData, loading } = useGridData();
  const { count: notificationCount } = useUnreadNotificationsCount();
  
  // Mock data if real data is not available yet
  const mockGridData = {
    purchased: 245.8,
    sold: 189.3,
    revenue: 35.72
  };
  
  const data = loading || !gridData ? mockGridData : gridData;

  return (
    <PageContainer 
      title="Grid" 
      showBack={true}
      notificationCount={notificationCount}
    >
      <GridChartPlaceholder />
      
      <div className="space-y-4">
        <Card className="bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ArrowDownToLine className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <h3 className="text-sm text-gray-600">Electricity Purchased</h3>
                <p className="text-lg font-semibold">{formatEnergy(data.purchased)}</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ArrowUpFromLine className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-sm text-gray-600">Electricity Sold</h3>
                <p className="text-lg font-semibold">{formatEnergy(data.sold)}</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-sm text-gray-600">Estimated Revenue</h3>
                <p className="text-lg font-semibold">{formatCurrency(data.revenue)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default GridPage;