import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createMilestone, deleteMilestone, getAllMilestones, updateMilestone } from "../services/milestoneService";
import type { Milestone, MilestoneFormValues } from "../types/milestone";

interface MilestonesContextValue {
  milestones: Milestone[];
  isLoading: boolean;
  error: string | null;
  addMilestone: (values: MilestoneFormValues) => Promise<void>;
  editMilestone: (id: string, values: MilestoneFormValues) => Promise<void>;
  removeMilestone: (id: string) => Promise<void>;
}

const MilestonesContext = createContext<MilestonesContextValue | null>(null);

export function MilestonesProvider({ children }: { children: ReactNode }) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getAllMilestones()
      .then((data) => {
        if (isMounted) setMilestones(data);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load milestones.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const addMilestone = useCallback(async (values: MilestoneFormValues) => {
    const created = await createMilestone(values);
    setMilestones((prev) => [...prev, created].sort((a, b) => a.displayOrder - b.displayOrder));
  }, []);

  const editMilestone = useCallback(async (id: string, values: MilestoneFormValues) => {
    const updated = await updateMilestone(id, values);
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? updated : m)).sort((a, b) => a.displayOrder - b.displayOrder)
    );
  }, []);

  const removeMilestone = useCallback(async (id: string) => {
    await deleteMilestone(id);
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const value = useMemo(
    () => ({ milestones, isLoading, error, addMilestone, editMilestone, removeMilestone }),
    [milestones, isLoading, error, addMilestone, editMilestone, removeMilestone]
  );

  return <MilestonesContext.Provider value={value}>{children}</MilestonesContext.Provider>;
}

export function useMilestones() {
  const ctx = useContext(MilestonesContext);
  if (!ctx) throw new Error("useMilestones must be used within a MilestonesProvider");
  return ctx;
}
