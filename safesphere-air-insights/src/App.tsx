import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";


import Index from "./pages/Index";
import Maps from "./pages/Maps";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function Layout() {
  const location = useLocation();

  // Hide navbar on homepage (onboarding)
  const hideNavbar = false;

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
     

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;