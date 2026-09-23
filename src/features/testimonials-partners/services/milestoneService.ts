import { milestonesData } from "../data/dummyData";
import type { Milestone, MilestoneFormValues } from "../types/milestone";

/**
 * Simulated backend for Milestones. Swap the internals for real `fetch` calls
 * when an API is available — hooks/useMilestones.ts is the only caller.
 */
let milestones: Milestone[] = [...milestonesData];

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getAllMilestones(): Promise<Milestone[]> {
  return delay([...milestones].sort((a, b) => a.displayOrder - b.displayOrder));
}

export async function createMilestone(values: MilestoneFormValues): Promise<Milestone> {
  const newMilestone: Milestone = {
    ...values,
    id: `mst_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  milestones = [newMilestone, ...milestones];
  return delay(newMilestone);
}

export async function updateMilestone(id: string, values: MilestoneFormValues): Promise<Milestone> {
  milestones = milestones.map((m) => (m.id === id ? { ...m, ...values } : m));
  const updated = milestones.find((m) => m.id === id)!;
  return delay(updated);
}

export async function deleteMilestone(id: string): Promise<void> {
  milestones = milestones.filter((m) => m.id !== id);
  return delay(undefined);
}
