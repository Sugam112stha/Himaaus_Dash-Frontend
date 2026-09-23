import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import TestimonialForm from "../components/TestimonialForm";
import { useTestimonials } from "../hooks/useTestimonials";
import type { TestimonialFormValues } from "../types/testimonial";

export default function AddTestimonialPage() {
  const navigate = useNavigate();
  const { addTestimonial } = useTestimonials();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (values: TestimonialFormValues) => {
    setIsSaving(true);
    try {
      await addTestimonial(values);
      navigate("/testimonials/all-testimonials");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/testimonials/all-testimonials");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Add Testimonial"
        subtitle="Add a new student testimonial."
        backTo="/testimonials/all-testimonials"
      />

      <TestimonialForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSaving={isSaving}
        submitLabel="Add Testimonial"
      />
    </div>
  );
}
