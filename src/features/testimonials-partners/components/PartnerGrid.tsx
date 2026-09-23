import type { Partner } from "../types/partner";
import PartnerCard from "./PartnerCard";
import EmptyState from "./EmptyState";

interface PartnerGridProps {
  partners: Partner[];
  isLoading: boolean;
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3.5 w-2/3 rounded" />
          <div className="skeleton h-3 w-1/3 rounded" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
      </div>
    </div>
  );
}

export default function PartnerGrid({ partners, isLoading, onEdit, onDelete }: PartnerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (partners.length === 0) {
    return <EmptyState title="No partners found" description="Try a different search term or add a new partner." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {partners.map((partner) => (
        <PartnerCard
          key={partner.id}
          partner={partner}
          onEdit={() => onEdit(partner)}
          onDelete={() => onDelete(partner)}
        />
      ))}
    </div>
  );
}
