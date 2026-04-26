import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
  confirmPassword: z.string(),
  dietary_tags: z.array(z.string()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
        localStorage.setItem('token', token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('token');
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: 'auth-storage', // nom de la clé dans localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // ce qu'on persiste
    }
  )
);