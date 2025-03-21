import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Resources from './pages/Resources';
import ForEmployers from './pages/ForEmployers';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import ResumeAssistant from './pages/ResumeAssistant';
import SavedJobs from './pages/SavedJobs';
import { AuthProvider } from '@/contexts/AuthContext';
import './App.css';

// Import our new components
import Skills from './pages/Skills';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/for-employers" element={<ForEmployers />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/resume-assistant" element={<ResumeAssistant />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
