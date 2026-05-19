export type roleType = "ADMIN" | "SALES";
export interface UserType {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN" | "SALES";
  leads: number;
  darkMode: boolean;

  setUserId: (userId: string) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setRole: (role: roleType) => void;
  setLeads: (leads: number) => void;

  toggleDarkMode: () => void;
}

export interface UseMeResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: "ADMIN" | "SALES";
    createdAt: Date;
  };
  leads: number;
}
