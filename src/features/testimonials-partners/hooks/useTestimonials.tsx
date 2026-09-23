import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  bulkDelete,
  bulkUpdateStatus,
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  updateTestimonial,
} from "../services/testimonialService";
import type { Testimonial, TestimonialFormValues } from "../types/testimonial";

interface TestimonialsContextValue {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  addTestimonial: (values: TestimonialFormValues) => Promise<void>;
  editTestimonial: (id: string, values: TestimonialFormValues) => Promise<void>;
  removeTestimonial: (id: string) => Promise<void>;
  bulkSetStatus: (ids: string[], status: Testimonial["status"]) => Promise<void>;
  bulkRemove: (ids: string[]) => Promise<void>;
}

const TestimonialsContext = createContext<TestimonialsContextValue | null>(null);

export function TestimonialsProvider({ children }: { children: ReactNode }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getAllTestimonials()
      .then((data) => {
        if (isMounted) setTestimonials(data);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load testimonials.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const addTestimonial = useCallback(async (values: TestimonialFormValues) => {
    const created = await createTestimonial(values);
    setTestimonials((prev) => [created, ...prev]);
  }, []);

  const editTestimonial = useCallback(async (id: string, values: TestimonialFormValues) => {
    const updated = await updateTestimonial(id, values);
    setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const removeTestimonial = useCallback(async (id: string) => {
    await deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const bulkSetStatus = useCallback(async (ids: string[], status: Testimonial["status"]) => {
    await bulkUpdateStatus(ids, status);
    setTestimonials((prev) => prev.map((t) => (ids.includes(t.id) ? { ...t, status } : t)));
  }, []);

  const bulkRemove = useCallback(async (ids: string[]) => {
    await bulkDelete(ids);
    setTestimonials((prev) => prev.filter((t) => !ids.includes(t.id)));
  }, []);

  const value = useMemo(
    () => ({
      testimonials,
      isLoading,
      error,
      addTestimonial,
      editTestimonial,
      removeTestimonial,
      bulkSetStatus,
      bulkRemove,
    }),
    [testimonials, isLoading, error, addTestimonial, editTestimonial, removeTestimonial, bulkSetStatus, bulkRemove]
  );

  return <TestimonialsContext.Provider value={value}>{children}</TestimonialsContext.Provider>;
}

export function useTestimonials() {
  const ctx = useContext(TestimonialsContext);
  if (!ctx) throw new Error("useTestimonials must be used within a TestimonialsProvider");
  return ctx;
}
