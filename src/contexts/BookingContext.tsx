import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity';
  name?: string;
  airline?: string;
  price: number;
  [key: string]: any;
}

interface BookingContextType {
  groupId: string | null;
  cartItems: BookingItem[];
  selectedFlight: BookingItem | null;
  selectedHotel: BookingItem | null;
  selectedActivities: BookingItem[];
  setGroupId: (id: string) => void;
  addToCart: (item: BookingItem) => void;
  removeFromCart: (itemId: string) => void;
  setSelectedFlight: (flight: BookingItem | null) => void;
  setSelectedHotel: (hotel: BookingItem | null) => void;
  addSelectedActivity: (activity: BookingItem) => void;
  clearBooking: () => void;
  getTotalPrice: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<BookingItem | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<BookingItem | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<BookingItem[]>([]);

  const addToCart = (item: BookingItem) => {
    setCartItems(prev => [...prev, item]);
    
    // Also set specific selections
    if (item.type === 'flight') {
      setSelectedFlight(item);
    } else if (item.type === 'hotel') {
      setSelectedHotel(item);
    } else if (item.type === 'activity') {
      setSelectedActivities(prev => [...prev, item]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    
    // Also clear specific selections
    if (selectedFlight?.id === itemId) {
      setSelectedFlight(null);
    }
    if (selectedHotel?.id === itemId) {
      setSelectedHotel(null);
    }
    setSelectedActivities(prev => prev.filter(item => item.id !== itemId));
  };

  const addSelectedActivity = (activity: BookingItem) => {
    setSelectedActivities(prev => [...prev, activity]);
    addToCart(activity);
  };

  const clearBooking = () => {
    setCartItems([]);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedActivities([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const value = {
    groupId,
    cartItems,
    selectedFlight,
    selectedHotel,
    selectedActivities,
    setGroupId,
    addToCart,
    removeFromCart,
    setSelectedFlight,
    setSelectedHotel,
    addSelectedActivity,
    clearBooking,
    getTotalPrice
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};