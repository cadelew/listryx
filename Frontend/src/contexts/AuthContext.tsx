'use client';

import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

type AuthProvider = 'google' | 'github';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<Session | null>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: AuthProvider, redirectPath?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      // Check for OAuth callback in URL (Supabase adds code and state params)
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Supabase session error', error);
      }

      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Handle OAuth callback - check if we have hash params (OAuth redirect)
      if (typeof window !== 'undefined') {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const errorParam = hashParams.get('error');
        
        if (errorParam) {
          console.error('OAuth error:', errorParam);
        } else if (accessToken && !session) {
          // OAuth callback detected but no session yet - wait a moment and retry
          setTimeout(async () => {
            const { data: { session: newSession } } = await supabase.auth.getSession();
            if (newSession && isMounted) {
              setSession(newSession);
              setUser(newSession.user);
              setLoading(false);
            }
          }, 500);
        }
      }
    };

    initSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      console.log('Auth state changed:', event, nextSession?.user?.email);
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const signIn = async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw new Error(error.message);
      }
    };

    const signUp = async (fullName: string, email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data.session ?? null;
    };

    const resetPassword = async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined,
      });

      if (error) {
        throw new Error(error.message);
      }
    };

    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    };

    const signInWithProvider = async (provider: AuthProvider, redirectPath: string = '/dashboard') => {
      if (typeof window === 'undefined') {
        throw new Error('OAuth sign-in must be called from the browser');
      }

      const redirectUrl = `${window.location.origin}${redirectPath}`;
      
      console.log('Starting OAuth flow:', { provider, redirectUrl });
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        throw new Error(error.message);
      }

      // OAuth redirect should happen automatically via data.url
      // If data.url exists, Supabase will redirect the browser
      if (data?.url) {
        console.log('OAuth URL generated, redirecting to:', data.url);
        // Manually redirect to ensure it happens
        window.location.href = data.url;
      } else {
        console.warn('No OAuth URL returned from Supabase');
        throw new Error('Failed to initiate OAuth flow');
      }
    };

    return {
      session,
      user,
      loading,
      signIn,
      signUp,
      resetPassword,
      signOut,
      signInWithProvider,
    };
  }, [loading, session, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a SupabaseAuthProvider');
  }
  return context;
}

