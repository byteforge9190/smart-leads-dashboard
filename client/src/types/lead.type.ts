export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";

export interface LeadDto {
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
  _id: string;
  name: string;
  email: string;
}

export interface LeadAvailableDto {
  first: LeadDto;
  funnel: {
    NEW: number;
    CONTACTED: number;
    QUALIFIED: number;
    LOST: number;
  };
  source: {
    WEBSITE: number;
    REFERRAL: number;
    INSTAGRAM: number;
  };
}
