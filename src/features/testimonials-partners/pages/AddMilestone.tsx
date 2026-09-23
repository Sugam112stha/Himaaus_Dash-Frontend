import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import MilestoneForm from "../components/MilestoneForm";
import { useMilestones } from "../hooks/useMilestones";
import type { MilestoneFormValues } from "../types/milestone";

export default function AddMilestonePage() {
  const navigate = useNavigate();
  const { addMilestone } = useMilestones();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (values: MilestoneFormValues) => {
    setIsSaving(true);
    try {
      await addMilestone(values);
      navigate("/milestones/all-milestones");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/milestones/all-milestones");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Add Milestone"
        subtitle="Create a new company achievement or statistic."
        backTo="/milestones/all-milestones"
      />

      <MilestoneForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSaving={isSaving}
        submitLabel="Add Milestone"
      />
    </div>
  );
}
