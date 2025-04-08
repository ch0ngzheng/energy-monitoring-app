import { useState, useEffect } from 'react';
import {
  subscribeToRealTimeBatteryStatus,
  subscribeToFloorsData,
  subscribeToFloorRooms,
  subscribeToRoomData,
  subscribeToGridData
} from '../services/firebase';

export const useBatteryStatus = () => {
  const [batteryData, setBatteryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToRealTimeBatteryStatus((data) => {
      setBatteryData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { batteryData, loading, error };
};

export const useFloorsData = () => {
  const [floorsData, setFloorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToFloorsData((data) => {
      setFloorsData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { floorsData, loading, error };
};

export const useFloorRooms = (floorId) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!floorId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToFloorRooms(floorId, (data) => {
      setRooms(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [floorId]);

  return { rooms, loading, error };
};

export const useRoomData = (roomId) => {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToRoomData(roomId, (data) => {
      setRoomData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  return { roomData, loading, error };
};

export const useGridData = () => {
  const [gridData, setGridData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToGridData((data) => {
      setGridData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { gridData, loading, error };
};
