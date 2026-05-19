import joi from "joi";
import type { CreateLead } from "../types/lead.type.js";

export const createLeadSchema = joi.object<CreateLead>({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  status: joi
    .string()
    .valid("New", "Contacted", "Qualified", "Lost")
    .required(),
  source: joi.string().valid("Website", "Instagram", "Referral").required(),
  notes: joi.string().optional(),
});
