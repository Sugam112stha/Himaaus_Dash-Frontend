import { Star } from "lucide-react";
import type { Testimonial } from "../types/testimonial";
import RatingStars from "./RatingStars";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import { formatDate } from "../utils/formatDate";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TestimonialCard({ testimonial, onEdit, onDelete }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-11 w-11 shrink-0 rounded-full border border-slate-100 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">{testimonial.name}</p>
            <p className="truncate text-xs text-slate-400">{testimonial.university}</p>
          </div>
        </div>
        {testimonial.featured && (
          <span title="Featured" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          </span>
        )}
      </div>

      <p className="line-clamp-3 flex-1 text-sm text-slate-600">{testimonial.review}</p>

      <RatingStars rating={testimonial.rating} />

      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
        <div>
          <StatusBadge
            status={testimonial.status}
            tone={testimonial.status === "Published" ? "green" : "slate"}
          />
          <p className="mt-1.5 text-xs text-slate-400">{formatDate(testimonial.createdAt)}</p>
        </div>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}