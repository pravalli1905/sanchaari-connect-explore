import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
