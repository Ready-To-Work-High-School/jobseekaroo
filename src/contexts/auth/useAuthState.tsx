
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function useAuthState(fetchUserProfile: (userId: string) => Promise<void>) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Debug log
      console.log("Auth state change event:", event, "Session:", session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Use setTimeout to prevent blocking renderer
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      }
      
      setIsLoading(false);
    });

    // First check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Debug log
      console.log("Initial session check:", session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    // Check for TLS/HTTPS in production
    if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
      console.warn('WARNING: Secure connection (HTTPS) is recommended for authentication.');
    }

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  return {
    user,
    session,
    isLoading
  };
}
