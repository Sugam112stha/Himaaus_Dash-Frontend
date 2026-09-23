export type PartnerStatus = "Active" | "Inactive";

export interface Partner {
  id: string;
  logo: string;
  name: string;
  country: string;
  category: string;
  website: string;
  description: string;
  status: PartnerStatus;
  createdAt: string;
}

export type PartnerFormValues = Omit<Partner, "id" | "createdAt">;
