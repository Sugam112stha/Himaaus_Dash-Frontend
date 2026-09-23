export type TestimonialStatus = "Published" | "Draft";

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  university: string;
  country: string;
  review: string;
  image: string;
  rating: number; // 1 - 5
  featured: boolean;
  status: TestimonialStatus;
  createdAt: string;
}

export type TestimonialFormValues = Omit<Testimonial, "id" | "createdAt">;
