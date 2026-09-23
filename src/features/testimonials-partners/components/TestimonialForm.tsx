import { useState } from "react";
import type { FormEvent } from "react";
import type { TestimonialFormValues, TestimonialStatus } from "../types/testimonial";
import { Input, Select, TextArea } from "./FormFields";
import ImageUploader from "./ImageUploader";
import RatingStars from "./RatingStars";
import FormButtons from "./FormButtons";
import { hasMinLength, isRequired } from "../utils/validators";

interface TestimonialFormProps {
  initialValues?: TestimonialFormValues;
  onSubmit: (values: TestimonialFormValues) => void;
  onCancel: () => void;
  isSaving?: boolean;
  submitLabel?: string;
}

const emptyValues: TestimonialFormValues = {
  name: "",
  position: "",
  university: "",
  country: "",
  review: "",
  image: "",
  rating: 5,
  featured: false,
  status: "Draft",
};

const REVIEW_MAX_LENGTH = 500;

export default function TestimonialForm({
  initialValues = emptyValues,
  onSubmit,
  onCancel,
  isSaving = false,
  submitLabel = "Save Testimonial",
}: TestimonialFormProps) {
  const [values, setValues] = useState<TestimonialFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof TestimonialFormValues, string>>>({});

  const update = <K extends keyof TestimonialFormValues>(key: K, value: TestimonialFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof TestimonialFormValues, string>> = {};
    if (!isRequired(values.name)) nextErrors.name = "Student name is required.";
    if (!isRequired(values.position)) nextErrors.position = "Position / program is required.";
    if (!isRequired(values.university)) nextErrors.university = "University is required.";
    if (!isRequired(values.country)) nextErrors.country = "Country is required.";
    if (!hasMinLength(values.review, 20)) nextErrors.review = "Review should be at least 20 characters.";
    if (!values.image) nextErrors.image = "Please upload a photo.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <ImageUploader
          label="Student Photo"
          shape="circle"
          value={values.image}
          error={errors.image}
          onChange={(image) => update("image", image)}
        />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Student Name"
            required
            value={values.name}
            error={errors.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Kyani Dan Rai"
          />
          <Input
            label="Position / Program"
            required
            value={values.position}
            error={errors.position}
            onChange={(e) => update("position", e.target.value)}
            placeholder="e.g. MSc Computer Science"
          />
          <Input
            label="University"
            required
            value={values.university}
            error={errors.university}
            onChange={(e) => update("university", e.target.value)}
            placeholder="e.g. University of Melbourne"
          />
          <Input
            label="Country"
            required
            value={values.country}
            error={errors.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder="e.g. Australia"
          />
          <Select
            label="Status"
            required
            value={values.status}
            onChange={(e) => update("status", e.target.value as TestimonialStatus)}
            options={[
              { label: "Draft", value: "Draft" },
              { label: "Published", value: "Published" },
            ]}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Rating</label>
            <div className="flex h-[42px] items-center gap-1">
              <RatingStars rating={values.rating} size="lg" interactive onChange={(r) => update("rating", r)} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <TextArea
            label="Review"
            required
            value={values.review}
            error={errors.review}
            maxLength={REVIEW_MAX_LENGTH}
            onChange={(e) => update("review", e.target.value)}
            placeholder="Share what the student said about their experience..."
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {values.review.length} / {REVIEW_MAX_LENGTH}
          </p>
        </div>

        <label className="mt-2 flex items-center gap-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
          />
          Feature this testimonial on the homepage
        </label>
      </div>

      <FormButtons saveLabel={submitLabel} onCancel={onCancel} isSaving={isSaving} />
    </form>
  );
}
