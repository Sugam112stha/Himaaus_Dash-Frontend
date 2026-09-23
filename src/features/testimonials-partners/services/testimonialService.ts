import { testimonialsData } from "../data/dummyData";
import type { Testimonial, TestimonialFormValues } from "../types/testimonial";

/**
 * Simulated backend for Testimonials. Swap the internals for real `fetch` calls
 * when an API is available — hooks/useTestimonials.ts is the only caller.
 */
let testimonials: Testimonial[] = [...testimonialsData];

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return delay([...testimonials]);
}

export async function createTestimonial(values: TestimonialFormValues): Promise<Testimonial> {
  const newTestimonial: Testimonial = {
    ...values,
    id: `t_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  testimonials = [newTestimonial, ...testimonials];
  return delay(newTestimonial);
}

export async function updateTestimonial(id: string, values: TestimonialFormValues): Promise<Testimonial> {
  testimonials = testimonials.map((t) => (t.id === id ? { ...t, ...values } : t));
  const updated = testimonials.find((t) => t.id === id)!;
  return delay(updated);
}

export async function deleteTestimonial(id: string): Promise<void> {
  testimonials = testimonials.filter((t) => t.id !== id);
  return delay(undefined);
}

export async function bulkUpdateStatus(ids: string[], status: Testimonial["status"]): Promise<void> {
  testimonials = testimonials.map((t) => (ids.includes(t.id) ? { ...t, status } : t));
  return delay(undefined);
}

export async function bulkDelete(ids: string[]): Promise<void> {
  testimonials = testimonials.filter((t) => !ids.includes(t.id));
  return delay(undefined);
}
