import joi from "joi";
import type { CreateLead, UpdateLead } from "../types/lead.type.js";

export const validateUUID = joi.string().regex(/^[0-9a-fA-F]{24}$/).required();

export const createLeadSchema = joi.object<CreateLead>({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  status: joi
    .string()
    .valid("New", "Contacted", "Qualified", "Lost")
    .default("New"),
  source: joi.string().valid("Website", "Instagram", "Referral").required(),
  notes: joi.string().optional(),
});

export const updateLeadSchema = joi.object<UpdateLead>({
  name: joi.string().min(3).max(50).optional(),
  email: joi.string().email().optional(),
  status: joi
    .string()
    .valid("New", "Contacted", "Qualified", "Lost")
    .optional(),
  source: joi.string().valid("Website", "Instagram", "Referral").optional(),
  notes: joi.string().optional(),
});