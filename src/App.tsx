
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import Index from "./pages/Index";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkLoading>
          <div className="h-screen w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClerkLoaded>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
