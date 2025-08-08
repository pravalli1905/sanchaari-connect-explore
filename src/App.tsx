import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import ChatBotWrapper from "./components/chatbot/ChatBotWrapper";
import ErrorBoundary from "./components/ui/error-boundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import LanguageSelection from "./pages/LanguageSelection";
import CreateGroup from "./pages/CreateGroup";
import GroupOverview from "./pages/GroupOverview";
import InviteMembers from "./pages/InviteMembers";
import AcceptRejectInvites from "./pages/AcceptRejectInvites";
import GroupChat from "./pages/GroupChat";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import ItineraryView from "./pages/ItineraryView";
import GroupPreferences from "./pages/GroupPreferences";
import GroupBudget from "./pages/GroupBudget";
import GroupMembers from "./pages/GroupMembers";
import ReplanStatus from "./pages/ReplanStatus";
import BookingStart from "./pages/BookingStart";
import SelectFlights from "./pages/SelectFlights";
import SelectHotels from "./pages/SelectHotels";
import SelectActivities from "./pages/SelectActivities";
import BookingReview from "./pages/BookingReview";
import BookingPayment from "./pages/BookingPayment";
import BookingConfirmation from "./pages/BookingConfirmation";
import PostBookingItinerary from "./pages/PostBookingItinerary";
import CancellationRequest from "./pages/CancellationRequest";
import RefundStatus from "./pages/RefundStatus";
import TravelDocuments from "./pages/TravelDocuments";
import Notifications from "./pages/Notifications";
import HelpCenter from "./pages/HelpCenter";
import SupportChat from "./pages/SupportChat";
import Feedback from "./pages/Feedback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={
              <PublicRoute message="You are already logged in. Redirecting to dashboard.">
                <Signup />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute message="You are already logged in. Redirecting to dashboard.">
                <Login />
              </PublicRoute>
            } />
            <Route path="/forgot-password" element={
              <PublicRoute redirectTo="/profile/change-password" message="Use profile settings to change your password.">
                <ForgotPassword />
              </PublicRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute message="Please login to access your dashboard.">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute message="Please login to edit your profile.">
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/change-password" element={
              <ProtectedRoute message="Login required to change password.">
                <ChangePassword />
              </ProtectedRoute>
            } />
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/groups/new" element={
              <ProtectedRoute message="Login to create a new group trip.">
                <CreateGroup />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId" element={
              <ProtectedRoute message="Please login to view group details.">
                <GroupOverview />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/invite" element={
              <ProtectedRoute message="Please log in to invite members to your group.">
                <InviteMembers />
              </ProtectedRoute>
            } />
            <Route path="/groups/invites" element={
              <ProtectedRoute message="You need to be logged in to accept or reject group invitations.">
                <AcceptRejectInvites />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/chat" element={
              <ProtectedRoute message="Log in to chat and plan with your group.">
                <GroupChat />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/itinerary/edit" element={
              <ProtectedRoute message="Login to view and edit the itinerary.">
                <ItineraryBuilder />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/itinerary" element={
              <ProtectedRoute message="Login to view the full itinerary.">
                <ItineraryView />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/preferences" element={
              <ProtectedRoute message="Please log in to set or update your trip preferences.">
                <GroupPreferences />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/budget" element={
              <ProtectedRoute message="Login to view and manage group budget.">
                <GroupBudget />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/members" element={
              <ProtectedRoute message="Please log in to view and manage group members.">
                <GroupMembers />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/replan-status" element={
              <ProtectedRoute message="Login to view trip re-optimization status.">
                <ReplanStatus />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/start" element={
              <ProtectedRoute message="Please login to start booking your trip.">
                <BookingStart />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/flights" element={
              <ProtectedRoute message="Please log in to search and book flights.">
                <SelectFlights />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/hotels" element={
              <ProtectedRoute message="Login to search and book hotels.">
                <SelectHotels />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/activities" element={
              <ProtectedRoute message="Login to browse and book activities.">
                <SelectActivities />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/review" element={
              <ProtectedRoute message="Login to review and confirm your bookings.">
                <BookingReview />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/payment" element={
              <ProtectedRoute message="Please login to complete payment.">
                <BookingPayment />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/confirmation" element={
              <ProtectedRoute message="Please login to view your booking confirmation.">
                <BookingConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/itinerary/post-booking" element={
              <ProtectedRoute message="Login to view your booked itinerary and updates.">
                <PostBookingItinerary />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/cancel" element={
              <ProtectedRoute message="Login to request cancellations or refunds.">
                <CancellationRequest />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groupId/refund-status" element={
              <ProtectedRoute message="Login to track refund status.">
                <RefundStatus />
              </ProtectedRoute>
            } />
            <Route path="/groups/:groupId/documents" element={
              <ProtectedRoute message="Login to upload travel documents.">
                <TravelDocuments />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute message="Login to view your notifications.">
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/help/chat" element={<SupportChat />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBotWrapper />
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </AuthProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
