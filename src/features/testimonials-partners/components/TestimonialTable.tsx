import { useState } from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "../types/testimonial";
import type { TableColumn } from "../types/common";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import RatingStars from "./RatingStars";
import { formatDate } from "../utils/formatDate";

interface TestimonialTableProps {
  testimonials: Testimonial[];
  isLoading: boolean;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
}

export default function TestimonialTable({
  testimonials,
  isLoading,
  onEdit,
  onDelete,
  selectedIds,
  onToggleSelect,
}: TestimonialTableProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const columns: TableColumn<Testimonial>[] = [
    ...(selectedIds && onToggleSelect
      ? [
          {
            key: "select",
            header: "",
            width: "40px",
            render: (row: Testimonial) => (
              <input
                type="checkbox"
                checked={selectedIds.includes(row.id)}
                onChange={() => onToggleSelect(row.id)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
              />
            ),
          } as TableColumn<Testimonial>,
        ]
      : []),
    {
      key: "student",
      header: "Student",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.image} alt={row.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 truncate font-medium text-slate-800">
              {row.name}
              {row.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />}
            </p>
            <p className="truncate text-xs text-slate-400">{row.country}</p>
          </div>
        </div>
      ),
    },
    {
      key: "review",
      header: "Review",
      render: (row) => {
        const isExpanded = expandedIds.has(row.id);
        const isLong = row.review.length > 120;
        return (
          <div className="max-w-xs">
            <p className={isExpanded ? "text-slate-600" : "line-clamp-2 text-slate-500"}>{row.review}</p>
            {isLong && (
              <button
                type="button"
                onClick={() => toggleExpanded(row.id)}
                className="mt-1 text-xs font-medium text-brand-600 hover:underline"
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        );
      },
    },
    {
      key: "university",
      header: "University / Position",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-700">{row.university}</p>
          <p className="text-xs text-slate-400">{row.position}</p>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (row) => <RatingStars rating={row.rating} />,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <StatusBadge status={row.status} tone={row.status === "Published" ? "green" : "slate"} />
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => <span className="text-slate-500">{formatDate(row.createdAt)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => <ActionButtons onEdit={() => onEdit(row)} onDelete={() => onDelete(row)} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={testimonials}
      rowKey={(row) => row.id}
      isLoading={isLoading}
      emptyTitle="No testimonials found"
      emptyDescription="Try a different search term or add a new testimonial."
    />
  );
}