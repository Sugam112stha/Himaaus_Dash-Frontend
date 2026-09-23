import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (value: number) => void;
}

const sizeClasses: Record<NonNullable<RatingStarsProps["size"]>, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
  lg: "h-6 w-6",
};

export default function RatingStars({ rating, size = "sm", interactive = false, onChange }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= rating;
        const star = (
          <Star className={`${sizeClasses[size]} ${filled ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
        );

        if (!interactive) {
          return <span key={starValue}>{star}</span>;
        }

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange?.(starValue)}
            className="p-0.5"
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
