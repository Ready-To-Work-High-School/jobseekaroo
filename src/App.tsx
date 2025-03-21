
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import Index from "./pages/Index";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import Resources from "./pages/Resources";
import ForEmployers from "./pages/ForEmployers";
import SuccessStories from "./pages/SuccessStories";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResumeAssistant from "./pages/ResumeAssistant";
import ResumeBuilder from "./pages/ResumeBuilder";
import EnhancedJobListings from './pages/EnhancedJobListings';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (replacing cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton className="z-[100]" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs" element={<EnhancedJobListings />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/for-employers" element={<ForEmployers />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/resume-assistant" element={<ResumeAssistant />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AccessibilityMenu />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
