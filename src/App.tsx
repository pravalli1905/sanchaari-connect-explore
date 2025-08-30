import React, { Suspense } from "react";
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

// ===== LAZY LOADED PAGES FOR PERFORMANCE =====

// Public Pages
const Index = React.lazy(() => import("./pages/Index"));
const Features = React.lazy(() => import("./pages/Features"));
const HowItWorks = React.lazy(() => import("./pages/HowItWorks"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const SupportChat = React.lazy(() => import("./pages/SupportChat"));
const Feedback = React.lazy(() => import("./pages/Feedback"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));

// Auth Pages
const Signup = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));

// User Dashboard Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Profile = React.lazy(() => import("./pages/Profile"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const LanguageSelection = React.lazy(() => import("./pages/LanguageSelection"));
const Notifications = React.lazy(() => import("./pages/Notifications"));

// Group Management Pages
const CreateGroup = React.lazy(() => import("./pages/CreateGroup"));
const GroupOverview = React.lazy(() => import("./pages/GroupOverview"));
const InviteMembers = React.lazy(() => import("./pages/InviteMembers"));
const AcceptRejectInvites = React.lazy(() => import("./pages/AcceptRejectInvites"));
const GroupChat = React.lazy(() => import("./pages/GroupChat"));
const GroupPreferences = React.lazy(() => import("./pages/GroupPreferences"));
const GroupBudget = React.lazy(() => import("./pages/GroupBudget"));
const GroupMembers = React.lazy(() => import("./pages/GroupMembers"));
const ReplanStatus = React.lazy(() => import("./pages/ReplanStatus"));

// Itinerary Pages
const ItineraryBuilder = React.lazy(() => import("./pages/ItineraryBuilder"));
const ItineraryView = React.lazy(() => import("./pages/ItineraryView"));
const PostBookingItinerary = React.lazy(() => import("./pages/PostBookingItinerary"));

// Booking Pages
const BookingStart = React.lazy(() => import("./pages/BookingStart"));
const SelectFlights = React.lazy(() => import("./pages/SelectFlights"));
const SelectHotels = React.lazy(() => import("./pages/SelectHotels"));
const SelectActivities = React.lazy(() => import("./pages/SelectActivities"));
const BookingReview = React.lazy(() => import("./pages/BookingReview"));
const BookingPayment = React.lazy(() => import("./pages/BookingPayment"));
const BookingConfirmation = React.lazy(() => import("./pages/BookingConfirmation"));
const CancellationRequest = React.lazy(() => import("./pages/CancellationRequest"));
const RefundStatus = React.lazy(() => import("./pages/RefundStatus"));
const TravelDocuments = React.lazy(() => import("./pages/TravelDocuments"));

// Partner Pages
const PartnerLogin = React.lazy(() => import("./pages/partner/PartnerLogin"));
const PartnerSignup = React.lazy(() => import("./pages/partner/PartnerSignup"));
const PartnerDashboard = React.lazy(() => import("./pages/partner/PartnerDashboard"));
const PartnerServices = React.lazy(() => import("./pages/partner/PartnerServices"));
const PartnerBookings = React.lazy(() => import("./pages/partner/PartnerBookings"));
const PartnerRefunds = React.lazy(() => import("./pages/partner/PartnerRefunds"));
const PartnerProfile = React.lazy(() => import("./pages/partner/PartnerProfile"));
const PartnerAnalytics = React.lazy(() => import("./pages/partner/PartnerAnalytics"));
const PartnerNotifications = React.lazy(() => import("./pages/partner/PartnerNotifications"));
const PartnerSupport = React.lazy(() => import("./pages/partner/PartnerSupport"));

// Admin Pages
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUserManagement = React.lazy(() => import("./pages/admin/AdminUserManagement"));
const AdminGroups = React.lazy(() => import("./pages/admin/AdminGroups"));
const AdminBookings = React.lazy(() => import("./pages/admin/AdminBookings"));
const AdminProviders = React.lazy(() => import("./pages/admin/AdminProviders"));
const AdminRefunds = React.lazy(() => import("./pages/admin/AdminRefunds"));
const AdminContent = React.lazy(() => import("./pages/admin/AdminContent"));
const AdminLanguages = React.lazy(() => import("./pages/admin/AdminLanguages"));
const AdminReports = React.lazy(() => import("./pages/admin/AdminReports"));
const AdminAIChatbot = React.lazy(() => import("./pages/admin/AdminAIChatbot"));
const AdminSettings = React.lazy(() => import("./pages/admin/AdminSettings"));
const AdminSupport = React.lazy(() => import("./pages/admin/AdminSupport"));
const AdminAuditLogs = React.lazy(() => import("./pages/admin/AdminAuditLogs"));
const AdminNotifications = React.lazy(() => import("./pages/admin/AdminNotifications"));

// 404 Page (not lazy loaded for immediate feedback)
import NotFound from "./pages/NotFound";

// Loading component with proper semantic tokens
const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Create QueryClient with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PartnerAuthProvider>
          <AdminAuthProvider>
            <BookingProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <div className="min-h-screen w-full">
                    <Suspense fallback={<LoadingSpinner />}>
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

                        {/* ===== PARTNER PORTAL ROUTES ===== */}
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

                        {/* ===== ADMIN PORTAL ROUTES ===== */}
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
                    </Suspense>
                    
                    {/* ChatBot - Available on all pages */}
                    <ChatBotWrapper />
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </BookingProvider>
          </AdminAuthProvider>
        </PartnerAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;