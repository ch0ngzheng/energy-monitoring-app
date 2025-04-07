import { useState, useEffect } from 'react';
import { subscribeToVisitors } from '../services/firebase';

export const useVisitorData = () => {
  const [visitorData, setVisitorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToVisitors((data) => {
      setVisitorData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { visitorData, loading, error };
};