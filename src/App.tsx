
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Home } from "./pages/Home";
import { Live } from "./pages/Live";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Following } from "./pages/Following";
import { Creator } from "./pages/Creator";
import { CreatorStudio } from "./pages/CreatorStudio";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster as HotToaster } from 'react-hot-toast';
import { useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Hide sidebar on live stream pages
  const shouldShowSidebar = !location.pathname.startsWith('/live/');

  return (
    <div className="min-h-screen bg-black flex w-full">
      {shouldShowSidebar && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Index onMenuClick={() => setSidebarOpen(true)} />} />
          <Route path="/live/:id" element={<Live />} />
          <Route path="/cart" element={<Cart onMenuClick={() => setSidebarOpen(true)} />} />
          <Route path="/wishlist" element={<Wishlist onMenuClick={() => setSidebarOpen(true)} />} />
          <Route path="/following" element={<Following onMenuClick={() => setSidebarOpen(true)} />} />
          <Route path="/creator/:id" element={<Creator onMenuClick={() => setSidebarOpen(true)} />} />
          <Route path="/creator-studio" element={<CreatorStudio onMenuClick={() => setSidebarOpen(true)} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HotToaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151'
            }
          }}
        />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
