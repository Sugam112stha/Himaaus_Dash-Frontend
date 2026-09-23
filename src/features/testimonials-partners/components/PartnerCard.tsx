import { ExternalLink } from "lucide-react";
import type { Partner } from "../types/partner";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

interface PartnerCardProps {
  partner: Partner;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PartnerCard({ partner, onEdit, onDelete }: PartnerCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-12 w-12 shrink-0 rounded-lg border border-slate-100 bg-white object-contain p-1"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">{partner.name}</p>
            <p className="truncate text-xs text-slate-400">{partner.country}</p>
          </div>
        </div>
        <span className="shrink-0">
          <StatusBadge status={partner.status} tone={partner.status === "Active" ? "green" : "slate"} />
        </span>
      </div>

      <span className="inline-flex w-fit max-w-full truncate rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
        {partner.category}
      </span>

      <p className="line-clamp-2 flex-1 text-sm text-slate-500">{partner.description}</p>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
        
        <a
          href={partner.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 truncate text-sm text-brand-600 hover:underline"
        >
          Visit site
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}