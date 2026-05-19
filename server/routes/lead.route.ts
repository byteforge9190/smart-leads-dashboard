import { Router } from "express";
import { validateUser } from "../middleware/validate.user.js";
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLeads,
  leadStatus,
  updateLead,
} from "../controller/lead.controller.js";
import {
  validateCreate,
  validateLeadId,
  validateUpdate,
} from "../middleware/validate.lead.js";

const router = Router();
router.use(validateUser);
router.get("/", getAllLeads);
router.get("/available", leadStatus);
router.post("/create", validateCreate, createLead);
router.get("/:id", validateLeadId, getLeads);
router.put("/:id", validateUpdate, updateLead);
router.delete("/:id", validateLeadId, deleteLead);
export default router;
