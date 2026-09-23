import { useState } from "react";
import type { FormEvent } from "react";
import type { PartnerFormValues, PartnerStatus } from "../types/partner";
import { partnerCategories, partnerCountries } from "../data/dummyData";
import { Input, Select, TextArea } from "./FormFields";
import ImageUploader from "./ImageUploader";
import FormButtons from "./FormButtons";
import { isRequired, isValidUrl } from "../utils/validators";

interface PartnerFormProps {
  initialValues?: PartnerFormValues;
  onSubmit: (values: PartnerFormValues) => void;
  onCancel: () => void;
  isSaving?: boolean;
  submitLabel?: string;
}

const emptyValues: PartnerFormValues = {
  logo: "",
  name: "",
  country: partnerCountries[0],
  category: partnerCategories[0],
  website: "",
  description: "",
  status: "Active",
};

export default function PartnerForm({
  initialValues = emptyValues,
  onSubmit,
  onCancel,
  isSaving = false,
  submitLabel = "Save Partner",
}: PartnerFormProps) {
  const [values, setValues] = useState<PartnerFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof PartnerFormValues, string>>>({});

  const update = <K extends keyof PartnerFormValues>(key: K, value: PartnerFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof PartnerFormValues, string>> = {};
    if (!isRequired(values.name)) nextErrors.name = "Partner name is required.";
    if (!isRequired(values.website)) nextErrors.website = "Website is required.";
    else if (!isValidUrl(values.website)) nextErrors.website = "Enter a valid URL starting with http:// or https://";
    if (!isRequired(values.description)) nextErrors.description = "Description is required.";
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
        <ImageUploader
          label="Partner Logo"
          hint="PNG, JPG or SVG. Recommended 200x200px."
          value={values.logo}
          onChange={(logo) => update("logo", logo)}
        />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Partner Name"
            required
            value={values.name}
            error={errors.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. University of Melbourne"
          />
          <Input
            label="Website"
            required
            value={values.website}
            error={errors.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://example.edu"
          />
          <Select
            label="Country"
            required
            value={values.country}
            onChange={(e) => update("country", e.target.value)}
            options={partnerCountries.map((c) => ({ label: c, value: c }))}
          />
          <Select
            label="Category"
            required
            value={values.category}
            onChange={(e) => update("category", e.target.value)}
            options={partnerCategories.map((c) => ({ label: c, value: c }))}
          />
          <Select
            label="Status"
            required
            value={values.status}
            onChange={(e) => update("status", e.target.value as PartnerStatus)}
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
          />
        </div>

        <div className="mt-5">
          <TextArea
            label="Short Description"
            required
            value={values.description}
            error={errors.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="A brief description of this partner organization..."
          />
        </div>
      </div>

      <FormButtons saveLabel={submitLabel} onCancel={onCancel} isSaving={isSaving} />
    </form>
  );
}
