
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const useMobileMenu = () => {
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = userProfile?.user_type === 'admin';
  const isEmployer = userProfile?.user_type === 'employer';
  
  // Debug logs
  useEffect(() => {
    console.log("MobileMenu (hook) - User profile:", userProfile);
    console.log("MobileMenu (hook) - Is admin:", isAdmin);
    console.log("MobileMenu (hook) - Current path:", location.pathname);
  }, [userProfile, isAdmin, location.pathname]);

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };
  
  // Function to handle sign out
  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return {
    user,
    isAdmin,
    isEmployer,
    location,
    getPath,
    handleSignOut
  };
};
