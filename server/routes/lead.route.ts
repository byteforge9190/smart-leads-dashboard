import { Router } from "express";
import { validateUser, validateRole } from "../middleware/validate.user.js";
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLead,
  leadStatus,
  updateLead,
  exportLeads,
} from "../controller/lead.controller.js";
import {
  validateCreate,
  validateLeadId,
  validateUpdate,
} from "../middleware/validate.lead.js";

const router = Router();
router.use(validateUser);

// Role-based access control applied on routes
router.get("/", validateRole("ADMIN", "SALES"), getAllLeads);
router.get("/available", validateRole("ADMIN", "SALES"), leadStatus);
router.get("/export", validateRole("ADMIN", "SALES"), exportLeads);
router.post("/create", validateRole("SALES", "ADMIN"), validateCreate, createLead);
router.get("/:id", validateRole("ADMIN", "SALES"), validateLeadId, getLead);
router.put("/:id", validateRole("SALES", "ADMIN"), validateUpdate, updateLead);
// Delete restricted to ADMIN only
router.delete("/:id", validateRole("ADMIN"), validateLeadId, deleteLead);
export default router;
