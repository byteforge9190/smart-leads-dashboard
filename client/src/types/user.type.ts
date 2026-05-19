export type roleType = "ADMIN" | "SALES";
export interface UserType {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN" | "SALES";
  leads: number;

  setUserId: (userId: string) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setRole: (role: roleType) => void;
  setLeads: (leads: number) => void;
}
