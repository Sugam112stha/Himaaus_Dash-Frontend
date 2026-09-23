export type MilestoneStatus = "Visible" | "Hidden";

export interface Milestone {
  id: string;
  title: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
  displayOrder: number;
  status: MilestoneStatus;
  createdAt: string;
}

export type MilestoneFormValues = Omit<Milestone, "id" | "createdAt">;
