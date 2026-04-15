import z from 'zod';
import { create } from 'zustand';
export const useAuthStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
    logout: () => {
        //Store (React State)
        set({ user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("user");

    },
}));

export const registerSchema = z.object({
    name: z.string().min(2, "Nom requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Minimum 8 caractères"),
    confirmPassword: z.string(),
    dietary_tags: z.array(z.string()).default([]),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],

});