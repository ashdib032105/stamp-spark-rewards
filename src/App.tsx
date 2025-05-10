
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Customer Pages
import JoinPage from "./pages/customer/JoinPage";
import LoyaltyCardPage from "./pages/customer/LoyaltyCardPage";

// Business Pages
import Dashboard from "./pages/business/Dashboard";
import CustomersPage from "./pages/business/CustomersPage";
import QrCodePage from "./pages/business/QrCodePage";
import RewardsPage from "./pages/business/RewardsPage";
import CashiersPage from "./pages/business/CashiersPage";
import SettingsPage from "./pages/business/SettingsPage";

// Cashier Pages
import CashierDashboard from "./pages/cashier/CashierDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/join" element={<JoinPage />} />
            
            {/* Customer Routes */}
            <Route path="/customer/loyalty-card" element={<LoyaltyCardPage />} />
            
            {/* Business Routes */}
            <Route path="/business/dashboard" element={<Dashboard />} />
            <Route path="/business/customers" element={<CustomersPage />} />
            <Route path="/business/rewards" element={<RewardsPage />} />
            <Route path="/business/qr-code" element={<QrCodePage />} />
            <Route path="/business/cashiers" element={<CashiersPage />} />
            <Route path="/business/settings" element={<SettingsPage />} />
            
            {/* Cashier Routes */}
            <Route path="/cashier/dashboard" element={<CashierDashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
