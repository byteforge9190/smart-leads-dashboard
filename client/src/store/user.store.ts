import { create } from "zustand";
import type { UserType } from "../types/user.type";

export const useUser = create<UserType>((set) => ({
    userId: "",
    email: "",
    name: "",
    role: "SALES",
    leads: 0,

    setUserId: (userId: string) => set({ userId }),
    setEmail: (email: string) => set({ email }),
    setName: (name: string) => set({ name }),
    setRole: (role: "ADMIN" | "SALES") => set({ role }),
    setLeads: (leads: number) => set({ leads }),
    
}))