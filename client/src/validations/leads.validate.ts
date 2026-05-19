import * as z from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).default("New"),
  source: z.enum(["Website", "Instagram", "Referral"]),
  notes: z.string().optional(),
});

export type CreateLeadType = z.infer<typeof createLeadSchema>;

export const updateLeadSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  email: z.email().optional(),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]).optional(),
  notes: z.string().optional(),
});

export type UpdateLeadType = z.infer<typeof updateLeadSchema>;
