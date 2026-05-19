import { create } from "zustand";
import type { UserType } from "../types/user.type";

export const useUser = create<UserType>((set) => ({
    userId: "",
    email: "",
    name: "",
    role: "SALES",
    leads: 0,
    darkMode: localStorage.getItem('darkMode') === 'true',

    setUserId: (userId: string) => set({ userId }),
    setEmail: (email: string) => set({ email }),
    setName: (name: string) => set({ name }),
    setRole: (role: "ADMIN" | "SALES") => set({ role }),
    setLeads: (leads: number) => set({ leads }),

    toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem('darkMode', String(newMode));
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { darkMode: newMode };
    });
  },
}));