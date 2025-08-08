import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ChatBot from './ChatBot';

const ChatBotWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Determine user type and context based on current route
  const getUserType = () => {
    if (location.pathname.includes('/partner') || location.pathname.includes('/business')) {
      return 'business';
    }
    return 'user';
  };

  const getContext = () => {
    const path = location.pathname;
    
    // Don't show chatbot on homepage
    if (path === '/') return null;
    
    if (path.includes('/booking')) return 'Booking - User is in the booking flow';
    if (path.includes('/dashboard')) return 'Dashboard - User is viewing their dashboard';
    if (path.includes('/profile')) return 'Profile - User is managing their profile';
    if (path.includes('/group')) return 'Group Management - User is managing group details';
    if (path.includes('/itinerary')) return 'Itinerary - User is planning their trip';
    if (path.includes('/login') || path.includes('/signup')) return 'Authentication - User is logging in or signing up';
    if (path.includes('/help')) return 'Help Center - User is looking for support';
    if (path.includes('/feedback')) return 'Feedback - User is providing feedback';
    
    return `Current page: ${path}`;
  };

  // Don't render chatbot on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <ChatBot 
      userType={getUserType()} 
      context={getContext()}
    />
  );
};

export default ChatBotWrapper;