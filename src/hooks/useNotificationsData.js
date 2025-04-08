import { useState, useEffect } from 'react';
import { 
  subscribeToNotifications,
  subscribeToUnreadNotificationsCount
} from '../services/firebase';

export const useNotifications = (limit = 20) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToNotifications((data) => {
      setNotifications(data);
      setLoading(false);
    }, limit);

    return () => unsubscribe();
  }, [limit]);

  return { notifications, loading, error };
};

export const useUnreadNotificationsCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToUnreadNotificationsCount((count) => {
      setCount(count);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { count, loading, error };
};