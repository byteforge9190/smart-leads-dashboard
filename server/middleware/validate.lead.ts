import type { NextFunction, Request, Response } from "express";
import { createLeadSchema } from "../validations/lead.validate.js";
import { errorResponse, status } from "../utils/response.js";
import type { LeadRequest } from "../types/lead.type.js";

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
    type: 'CREATE',
    data: value
  };
  next();
};
