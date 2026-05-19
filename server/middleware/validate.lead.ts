import type { NextFunction, Request, Response } from "express";
import {
  createLeadSchema,
  updateLeadSchema,
  validateUUID,
} from "../validations/lead.validate.js";
import { errorResponse, status } from "../utils/response.js";
import type { LeadRequest } from "../types/lead.type.js";
import { Lead } from "../models/lead.model.js";

export const validateCreate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = createLeadSchema.validate(req.body);
  if (error)
    return res.status(status.BAD_REQUEST).json({
      ...errorResponse,
      message: "Validation failed",
      error: error.details.map((d) => d.message).join(", "),
    });
  (req as LeadRequest).purpose = {
    type: "CREATE",
    data: value,
  };
  next();
};

export const validateUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const leadId = req.params.id;
  if (!leadId) {
    return res.status(status.BAD_REQUEST).json({
      ...errorResponse,
      message: "Lead ID is required in the URL parameters",
    });
  }
  const { error: uuidError, value: validatedId } =
    validateUUID.validate(leadId);
  if (uuidError)
    return res.status(status.BAD_REQUEST).json({
      ...errorResponse,
      message: "Invalid lead ID",
    });
  const lead = await Lead.findById(validatedId);
  if (!lead)
    return res.status(status.NOT_FOUND).json({
      ...errorResponse,
      message: "Lead not found",
    });

  const { error, value } = updateLeadSchema.validate(req.body);
  if (error)
    return res.status(status.BAD_REQUEST).json({
      ...errorResponse,
      message: "Validation failed",
      error: error.details.map((d) => d.message).join(", "),
    });

  (req as LeadRequest).purpose = {
    type: "UPDATE",
    data: value,
    lead: {
      _id: lead._id.toString(),
      createdBy: lead.createdBy.toString(),
    },
  };
  next();
};

export const validateLeadId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const leadId = req.params.id;
  if (!leadId)
    return res.status(status.BAD_REQUEST).json({
      ...errorResponse,
      message: "Lead ID is required in the URL parameters",
    });
  const { error, value } = validateUUID.validate(leadId);
  if (error)
    return res.status(status.BAD_REQUEST).json({
      ...errorResponse,
      message: "Invalid lead ID",
    });
  const lead = await Lead.findById(value);
  if (!lead)
    return res.status(status.NOT_FOUND).json({
      ...errorResponse,
      message: "Lead not found",
    });
  (req as LeadRequest).purpose = {
    type: "AVAIL",
    lead: {
      _id: lead._id.toString(),
      createdBy: lead.createdBy.toString(),
    },
  };
  next();
};
