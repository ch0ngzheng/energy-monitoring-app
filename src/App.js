import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all pages
import HomePage from './pages/HomePage';
import FloorsPage from './pages/FloorsPage';
import FloorDetailPage from './pages/FloorDetailPage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import BatteryPage from './pages/BatteryPage';
import GridPage from './pages/GridPage';
import VisitorsPage from './pages/VisitorsPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50 font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/floors" element={<FloorsPage />} />
          <Route path="/floors/:floorId" element={<FloorDetailPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
          <Route path="/battery" element={<BatteryPage />} />
          <Route path="/grid" element={<GridPage />} />
          <Route path="/visitors" element={<VisitorsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;