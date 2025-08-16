import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import { PartnerAuthProvider } from "./contexts/PartnerAuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ChatBotWrapper from "./components/chatbot/ChatBotWrapper";
import ErrorBoundary from "./components/ui/error-boundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import PartnerProtectedRoute from "./components/partner/PartnerProtectedRoute";
import PartnerPublicRoute from "./components/partner/PartnerPublicRoute";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import AdminPublicRoute from "./components/auth/AdminPublicRoute";

// ===== USER PAGES (34) =====
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
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

// ===== PARTNER PAGES (10) =====
import PartnerLogin from "./pages/partner/PartnerLogin";
import PartnerSignup from "./pages/partner/PartnerSignup";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerServices from "./pages/partner/PartnerServices";
import PartnerBookings from "./pages/partner/PartnerBookings";
import PartnerRefunds from "./pages/partner/PartnerRefunds";
import PartnerProfile from "./pages/partner/PartnerProfile";
import PartnerAnalytics from "./pages/partner/PartnerAnalytics";
import PartnerNotifications from "./pages/partner/PartnerNotifications";
import PartnerSupport from "./pages/partner/PartnerSupport";

// ===== ADMIN PAGES (15) =====
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminGroups from "./pages/admin/AdminGroups";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminProviders from "./pages/admin/AdminProviders";
import AdminRefunds from "./pages/admin/AdminRefunds";
import AdminContent from "./pages/admin/AdminContent";
import AdminLanguages from "./pages/admin/AdminLanguages";
import AdminReports from "./pages/admin/AdminReports";
import AdminAIChatbot from "./pages/admin/AdminAIChatbot";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminNotifications from "./pages/admin/AdminNotifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AuthProvider>
        <PartnerAuthProvider>
          <AdminAuthProvider>
            <BookingProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* ===== PUBLIC ROUTES ===== */}
                    <Route path="/" element={<Index />} />
                    <Route path="/language" element={<LanguageSelection />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/help/chat" element={<SupportChat />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/terms" element={<TermsOfService />} />

                    {/* ===== USER AUTHENTICATION ROUTES ===== */}
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

                    {/* ===== USER PROTECTED ROUTES ===== */}
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
                    <Route path="/notifications" element={
                      <ProtectedRoute message="Login to view your notifications.">
                        <Notifications />
                      </ProtectedRoute>
                    } />

                    {/* ===== GROUP MANAGEMENT ROUTES ===== */}
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

                    {/* ===== ITINERARY ROUTES ===== */}
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
                    <Route path="/groups/:groupId/itinerary/post-booking" element={
                      <ProtectedRoute message="Login to view your booked itinerary and updates.">
                        <PostBookingItinerary />
                      </ProtectedRoute>
                    } />

                    {/* ===== BOOKING ROUTES ===== */}
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

                    {/* ===== PARTNER PORTAL ROUTES (10) ===== */}
                    <Route path="/partner/login" element={
                      <PartnerPublicRoute message="You are already logged in to the partner portal.">
                        <PartnerLogin />
                      </PartnerPublicRoute>
                    } />
                    <Route path="/partner/signup" element={
                      <PartnerPublicRoute message="You are already logged in to the partner portal.">
                        <PartnerSignup />
                      </PartnerPublicRoute>
                    } />
                    <Route path="/partner/dashboard" element={
                      <PartnerProtectedRoute message="Please login to access your partner dashboard.">
                        <PartnerDashboard />
                      </PartnerProtectedRoute>
                    } />
                    <Route path="/partner/services" element={
                      <PartnerProtectedRoute message="Please login to manage your services.">
                        <PartnerServices />
                      </PartnerProtectedRoute>
                    } />
                    <Route path="/partner/bookings" element={
                      <PartnerProtectedRoute message="Please login to view bookings.">
                        <PartnerBookings />
                      </PartnerProtectedRoute>
                    } />
                    <Route path="/partner/refunds" element={
                      <PartnerProtectedRoute message="Please login to manage refunds.">
                        <PartnerRefunds />
                      </PartnerProtectedRoute>
                    } />
                    <Route path="/partner/analytics" element={
                      <PartnerProtectedRoute message="Please login to view analytics.">
                        <PartnerAnalytics />
                      </PartnerProtectedRoute>
                    } />
                    <Route path="/partner/notifications" element={
                      <PartnerProtectedRoute message="Please login to view notifications.">
                        <PartnerNotifications />
                      </PartnerProtectedRoute>
                    } />
                    <Route path="/partner/support" element={
                      <PartnerProtectedRoute message="Please login to access support.">
                        <PartnerSupport />
                      </PartnerProtectedRoute>
                    } />
                    <Route path="/partner/profile" element={
                      <PartnerProtectedRoute message="Please login to edit your profile.">
                        <PartnerProfile />
                      </PartnerProtectedRoute>
                    } />

                    {/* ===== ADMIN PORTAL ROUTES (15) ===== */}
                    <Route path="/admin/login" element={
                      <AdminPublicRoute message="You are already logged in to the admin panel.">
                        <AdminLogin />
                      </AdminPublicRoute>
                    } />
                    <Route path="/admin/dashboard" element={
                      <AdminProtectedRoute message="Please login to access the admin panel.">
                        <AdminDashboard />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/users" element={
                      <AdminProtectedRoute message="Please login to access user management.">
                        <AdminUserManagement />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/groups" element={
                      <AdminProtectedRoute message="Please login to access group management.">
                        <AdminGroups />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/bookings" element={
                      <AdminProtectedRoute message="Please login to access booking management.">
                        <AdminBookings />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/providers" element={
                      <AdminProtectedRoute message="Please login to access provider management.">
                        <AdminProviders />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/refunds" element={
                      <AdminProtectedRoute message="Please login to access refund management.">
                        <AdminRefunds />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/content" element={
                      <AdminProtectedRoute message="Please login to access content management.">
                        <AdminContent />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/languages" element={
                      <AdminProtectedRoute message="Please login to access language management.">
                        <AdminLanguages />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/reports" element={
                      <AdminProtectedRoute message="Please login to access analytics & reports.">
                        <AdminReports />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/ai-chatbot" element={
                      <AdminProtectedRoute message="Please login to access AI chatbot configuration.">
                        <AdminAIChatbot />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/settings" element={
                      <AdminProtectedRoute message="Please login to access system settings.">
                        <AdminSettings />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/support" element={
                      <AdminProtectedRoute message="Please login to access support ticket management.">
                        <AdminSupport />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/audit-logs" element={
                      <AdminProtectedRoute message="Please login to access audit logs.">
                        <AdminAuditLogs />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/notifications" element={
                      <AdminProtectedRoute message="Please login to access notification management.">
                        <AdminNotifications />
                      </AdminProtectedRoute>
                    } />

                    {/* ===== CATCH-ALL ROUTE (MUST BE LAST) ===== */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ChatBotWrapper />
                </BrowserRouter>
              </TooltipProvider>
            </BookingProvider>
          </AdminAuthProvider>
        </PartnerAuthProvider>
      </AuthProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;