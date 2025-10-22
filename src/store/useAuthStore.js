import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '../services/supabase';

/**
 * Authentication Store
 * Manages user authentication state and session
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      /**
       * Sign up new user with email verification
       */
      signUp: async (email, password, metadata = {}) => {
        set({ isLoading: true, error: null });
        try {
          const data = await auth.signUp(email, password, metadata);
          set({
            isLoading: false,
            error: null,
          });
          return data;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      /**
       * Sign in with email and password
       */
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await auth.signIn(email, password);
          set({
            user: data.user,
            session: data.session,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return data;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      /**
       * Sign out current user
       */
      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          await auth.signOut();
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      /**
       * Initialize auth state from Supabase session
       */
      initialize: async () => {
        set({ isLoading: true });
        try {
          const session = await auth.getSession();
          if (session) {
            const user = await auth.getUser();
            set({
              user,
              session,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          set({ isLoading: false, error: error.message });
        }
      },

      /**
       * Update user profile
       */
      updateProfile: async (updates) => {
        set({ isLoading: true, error: null });
        try {
          // Update user metadata in Supabase
          const { user: currentUser } = get();
          if (!currentUser) throw new Error('Not authenticated');

          set({
            user: { ...currentUser, user_metadata: { ...currentUser.user_metadata, ...updates } },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      /**
       * Request password reset
       */
      resetPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await auth.resetPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      /**
       * Update password
       */
      updatePassword: async (newPassword) => {
        set({ isLoading: true, error: null });
        try {
          await auth.updatePassword(newPassword);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      /**
       * Clear error
       */
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
