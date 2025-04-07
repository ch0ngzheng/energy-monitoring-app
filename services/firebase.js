import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  onSnapshot,
  orderBy,
  limit
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your Firebase config
// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9ppD43OeqD2UpKAa1re735X7ShQH3zzQ",
    authDomain: "productdesignstudioapp.firebaseapp.com",
    projectId: "productdesignstudioapp",
    storageBucket: "productdesignstudioapp.firebasestorage.app",
    messagingSenderId: "868853805203",
    appId: "1:868853805203:web:c4fad0e609ca4026689d66",
    measurementId: "G-FS4G18E12B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Auth services
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Firestore services
export const getBatteryStatus = async () => {
  const docRef = doc(db, 'system', 'battery');
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No battery data found!");
    return null;
  }
};

export const subscribeToRealTimeBatteryStatus = (callback) => {
  const docRef = doc(db, 'system', 'battery');
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      console.log("No battery data found!");
      callback(null);
    }
  });
};

export const getFloorsData = async () => {
  const floorsCollection = collection(db, 'floors');
  const floorsSnapshot = await getDocs(floorsCollection);
  return floorsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const subscribeToFloorsData = (callback) => {
  const floorsCollection = collection(db, 'floors');
  return onSnapshot(floorsCollection, (snapshot) => {
    const floors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(floors);
  });
};

export const getFloorRooms = async (floorId) => {
  const roomsCollection = collection(db, 'rooms');
  const q = query(roomsCollection, where("floorId", "==", floorId));
  const roomsSnapshot = await getDocs(q);
  
  return roomsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const subscribeToFloorRooms = (floorId, callback) => {
  const roomsCollection = collection(db, 'rooms');
  const q = query(roomsCollection, where("floorId", "==", floorId));
  
  return onSnapshot(q, (snapshot) => {
    const rooms = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(rooms);
  });
};

export const getRoomData = async (roomId) => {
  const docRef = doc(db, 'rooms', roomId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } else {
    console.log("No room data found!");
    return null;
  }
};

export const subscribeToRoomData = (roomId, callback) => {
  const docRef = doc(db, 'rooms', roomId);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({
        id: doc.id,
        ...doc.data()
      });
    } else {
      console.log("No room data found!");
      callback(null);
    }
  });
};

export const getGridData = async () => {
  const docRef = doc(db, 'system', 'grid');
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No grid data found!");
    return null;
  }
};

export const subscribeToGridData = (callback) => {
  const docRef = doc(db, 'system', 'grid');
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      console.log("No grid data found!");
      callback(null);
    }
  });
};

export const getVisitors = async () => {
  const docRef = doc(db, 'system', 'visitors');
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No visitors data found!");
    return null;
  }
};

export const subscribeToVisitors = (callback) => {
  const docRef = doc(db, 'system', 'visitors');
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      console.log("No visitors data found!");
      callback(null);
    }
  });
};

export const getNotifications = async (limit = 20) => {
  const notificationsCollection = collection(db, 'notifications');
  const q = query(
    notificationsCollection, 
    orderBy('timestamp', 'desc'), 
    limit(limit)
  );
  
  const notificationsSnapshot = await getDocs(q);
  
  return notificationsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const subscribeToNotifications = (callback, limitCount = 20) => {
  const notificationsCollection = collection(db, 'notifications');
  const q = query(
    notificationsCollection, 
    orderBy('timestamp', 'desc'), 
    limit(limitCount)
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(notifications);
  });
};

export const getUnreadNotificationsCount = async () => {
  const notificationsCollection = collection(db, 'notifications');
  const q = query(
    notificationsCollection, 
    where('isRead', '==', false)
  );
  
  const notificationsSnapshot = await getDocs(q);
  return notificationsSnapshot.size;
};

export const subscribeToUnreadNotificationsCount = (callback) => {
  const notificationsCollection = collection(db, 'notifications');
  const q = query(
    notificationsCollection, 
    where('isRead', '==', false)
  );
  
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.size);
  });
};

export default {
  loginWithEmail,
  getBatteryStatus,
  subscribeToRealTimeBatteryStatus,
  getFloorsData,
  subscribeToFloorsData,
  getFloorRooms,
  subscribeToFloorRooms,
  getRoomData,
  subscribeToRoomData,
  getGridData,
  subscribeToGridData,
  getVisitors,
  subscribeToVisitors,
  getNotifications,
  subscribeToNotifications,
  getUnreadNotificationsCount,
  subscribeToUnreadNotificationsCount
};