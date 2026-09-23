import { useState } from "react";
import type { FormEvent } from "react";
import type { MilestoneFormValues, MilestoneStatus } from "../types/milestone";
import { Input, Select, TextArea } from "./FormFields";
import IconPicker from "./IconPicker";
import FormButtons from "./FormButtons";
import { isNonNegativeNumber, isPositiveInteger, isRequired } from "../utils/validators";

interface MilestoneFormProps {
  initialValues?: MilestoneFormValues;
  onSubmit: (values: MilestoneFormValues) => void;
  onCancel: () => void;
  isSaving?: boolean;
  submitLabel?: string;
}

const emptyValues: MilestoneFormValues = {
  title: "",
  value: 0,
  suffix: "+",
  description: "",
  icon: "Star",
  displayOrder: 1,
  status: "Visible",
};

export default function MilestoneForm({
  initialValues = emptyValues,
  onSubmit,
  onCancel,
  isSaving = false,
  submitLabel = "Save Milestone",
}: MilestoneFormProps) {
  const [values, setValues] = useState<MilestoneFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof MilestoneFormValues, string>>>({});

  const update = <K extends keyof MilestoneFormValues>(key: K, value: MilestoneFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof MilestoneFormValues, string>> = {};
    if (!isRequired(values.title)) nextErrors.title = "Title is required.";
    if (!isNonNegativeNumber(values.value)) nextErrors.value = "Enter a valid positive number.";
    if (!isRequired(values.description)) nextErrors.description = "Description is required.";
    if (!isPositiveInteger(values.displayOrder)) nextErrors.displayOrder = "Order must be at least 1.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <IconPicker value={values.icon} onChange={(icon) => update("icon", icon)} />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Title"
            required
            value={values.title}
            error={errors.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Students Placed"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Statistic Number"
              required
              type="number"
              min={0}
              value={values.value}
              error={errors.value}
              onChange={(e) => update("value", Number(e.target.value))}
            />
            <Input
              label="Suffix"
              value={values.suffix}
              onChange={(e) => update("suffix", e.target.value)}
              placeholder="+, %, etc."
            />
          </div>
          <Input
            label="Display Order"
            required
            type="number"
            min={1}
            value={values.displayOrder}
            error={errors.displayOrder}
            onChange={(e) => update("displayOrder", Number(e.target.value))}
          />
          <Select
            label="Status"
            required
            value={values.status}
            onChange={(e) => update("status", e.target.value as MilestoneStatus)}
            options={[
              { label: "Visible", value: "Visible" },
              { label: "Hidden", value: "Hidden" },
            ]}
          />
        </div>

        <div className="mt-5">
          <TextArea
            label="Description"
            required
            value={values.description}
            error={errors.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="A brief description of this achievement..."
          />
        </div>
      </div>

      <FormButtons saveLabel={submitLabel} onCancel={onCancel} isSaving={isSaving} />
    </form>
  );
}
