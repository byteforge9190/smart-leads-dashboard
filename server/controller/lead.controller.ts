import type { Request, Response } from "express";
import type { LeadRequest } from "../types/lead.type.js";
import { Lead } from "../models/lead.model.js";
import { errorResponse, status, successResponse } from "../utils/response.js";

export const createLead = async (req: Request, res: Response) => {
  const { user, purpose } = req as LeadRequest;
  if (purpose.type !== "CREATE") return;
 try {
   const data = await Lead.create({
     name: purpose.data.name,
     email: purpose.data.email,
     status: purpose.data.status,
     source: purpose.data.source,
     notes: purpose.data.notes ?? null,
     createdBy: user.userId,
   });
   await data.populate("createdBy", "name email role");
   res
     .status(201)
     .json({ ...successResponse, message: "Lead created successfully", data });
 } catch (error) {
  return res
    .status(status.INTERNAL_SERVER_ERROR)
    .json({ ...errorResponse, message: "Internal server error", error });
 }
};

export const getLeads = async (req: Request, res: Response) => {
  const { user, purpose } = req as LeadRequest;
  if (purpose.type !== "AVAIL") return;

  if (user.role !== "ADMIN" && purpose.lead.createdBy !== user.userId) {
    return res.status(status.FORBIDDEN).json({
      ...errorResponse,
      message: "You are not the owner of this lead",
    });
  }
  try {
    const leads = await Lead.findById(purpose.lead._id).populate(
      "createdBy",
      "name email role",
    );
    res.status(200).json({ ...successResponse, data: leads });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  const { user, purpose } = req as LeadRequest;
  if (purpose.type !== "UPDATE") return;
  if (user.role !== "ADMIN" && purpose.lead.createdBy !== user.userId)
    return res.status(status.FORBIDDEN).json({
      ...errorResponse,
      message: "You are not the owner of this lead",
    });

  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      purpose.lead._id,
      { $set: purpose.data },
      { new: true, runValidators: true },
    ).populate("createdBy", "name email role");
    res.status(200).json({ ...successResponse, data: updatedLead });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  const { user, purpose } = req as LeadRequest;
  if (purpose.type !== "AVAIL") return;

  if (user.role !== "ADMIN" && purpose.lead.createdBy !== user.userId) {
    return res.status(status.FORBIDDEN).json({
      ...errorResponse,
      message: "You are not the owner of this lead",
    });
  }
  try {
    await Lead.findByIdAndDelete(purpose.lead._id);
    res
      .status(200)
      .json({ ...successResponse, message: "Lead deleted successfully" });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
  }
};
