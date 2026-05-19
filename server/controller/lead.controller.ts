import type { Request, Response } from "express";
import type { LeadRequest } from "../types/lead.type.js";
import { Lead } from "../models/lead.model.js";
import { errorResponse, status, successResponse } from "../utils/response.js";
import type { UserRequest } from "../types/auth.type.js";

export const leadStatus = async (req: Request, res: Response) => {
  const { user } = req as UserRequest;
  try {
    const leads = await Lead.find({ createdBy: user.userId });
    const firstLead = leads[0];
    if (!leads.length || !firstLead)
      return res.status(status.BAD_REQUEST).json({
        ...errorResponse,
        message: "No leads found for the user",
        data: {
          statusCount: {},
        },
      });
    const data = {
      first: {
        status: firstLead.status,
        source: firstLead.source,
        _id: firstLead._id,
        name: firstLead.name,
        email: firstLead.email,
      },
      funnel: {
        NEW: leads.filter((lead) => lead.status === "New").length,
        CONTACTED: leads.filter((lead) => lead.status === "Contacted").length,
        QUALIFIED: leads.filter((lead) => lead.status === "Qualified").length,
        LOST: leads.filter((lead) => lead.status === "Lost").length,
      },
      source: {
        WEBSITE: leads.filter((lead) => lead.source === "Website").length,
        REFERRAL: leads.filter((lead) => lead.source === "Referral").length,
        INSTAGRAM: leads.filter((lead) => lead.source === "Instagram").length,
      },
    };
    res.status(200).json({ ...successResponse, data, message: "Lead status fetched successfully" });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ ...errorResponse, message: "Internal server error", error });
  }
};
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
    return res.status(status.UNAUTHORIZED).json({
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
    return res.status(status.UNAUTHORIZED).json({
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
    return res.status(status.UNAUTHORIZED).json({
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

// Left with paginated data based on creator Id or admin
