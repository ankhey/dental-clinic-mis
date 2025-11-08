import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import ComDashboard from "./pages/ComDashboard";
import CashierDashboard from "./pages/CashierDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import AccountsDashboard from "./pages/AccountsDashboard";
import InsuranceDashboard from "./pages/InsuranceDashboard";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/com/*" element={<ProtectedRoute><ComDashboard /></ProtectedRoute>} />
            <Route path="/cashier/*" element={<ProtectedRoute><CashierDashboard /></ProtectedRoute>} />
            <Route path="/finance/*" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/accounts/*" element={<ProtectedRoute><AccountsDashboard /></ProtectedRoute>} />
            <Route path="/insurance/*" element={<ProtectedRoute><InsuranceDashboard /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
