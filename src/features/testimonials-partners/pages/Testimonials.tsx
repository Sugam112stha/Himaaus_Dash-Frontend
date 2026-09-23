import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Plus, Star, Trash2, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatsCard from "../components/StatsCard";
import TableToolbar from "../components/TableToolbar";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialTable from "../components/TestimonialTable";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import DeleteModal from "../components/DeleteModal";
import TestimonialForm from "../components/TestimonialForm";
import { useTestimonials } from "../hooks/useTestimonials";
import type { Testimonial, TestimonialFormValues, TestimonialStatus } from "../types/testimonial";
import type { ViewMode } from "../types/common";

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3.5 w-2/3 rounded" />
          <div className="skeleton h-3 w-1/3 rounded" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const { testimonials, isLoading, editTestimonial, removeTestimonial, bulkSetStatus, bulkRemove } =
    useTestimonials();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TestimonialStatus | "All">("All");
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isBulkWorking, setIsBulkWorking] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, pageSize, statusFilter]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return testimonials.filter((t) => {
      const matchesTerm =
        !term ||
        t.name.toLowerCase().includes(term) ||
        t.university.toLowerCase().includes(term) ||
        t.country.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;
      return matchesTerm && matchesStatus;
    });
  }, [testimonials, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const stats = useMemo(() => {
    const published = testimonials.filter((t) => t.status === "Published").length;
    const featured = testimonials.filter((t) => t.featured).length;
    return {
      total: testimonials.length,
      published,
      pending: testimonials.length - published,
      featured,
    };
  }, [testimonials]);

  const openAddPage = () => {
    navigate("/testimonials/add-new");
  };

  const openEditForm = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleEditSubmit = async (values: TestimonialFormValues) => {
    if (!editingTestimonial) return;
    setIsSaving(true);
    try {
      await editTestimonial(editingTestimonial.id, values);
      setEditingTestimonial(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;
    setIsDeleting(true);
    try {
      await removeTestimonial(testimonialToDelete.id);
      setTestimonialToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    const pageIds = paginated.map((t) => t.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    setSelectedIds((prev) => (allSelected ? prev.filter((id) => !pageIds.includes(id)) : [...new Set([...prev, ...pageIds])]));
  };

  const handleBulkStatus = async (status: TestimonialStatus) => {
    setIsBulkWorking(true);
    try {
      await bulkSetStatus(selectedIds, status);
      setSelectedIds([]);
    } finally {
      setIsBulkWorking(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsBulkWorking(true);
    try {
      await bulkRemove(selectedIds);
      setSelectedIds([]);
      setIsBulkDeleteOpen(false);
    } finally {
      setIsBulkWorking(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="All Testimonials"
        subtitle="Manage student reviews and success stories."
        action={
          <button
            onClick={openAddPage}
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard label="Total Testimonials" value={stats.total} icon={<Users className="h-5 w-5" />} accent="blue" />
        <StatsCard
          label="Published"
          value={stats.published}
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="green"
        />
        <StatsCard label="Pending" value={stats.pending} icon={<Clock className="h-5 w-5" />} accent="amber" />
        <StatsCard label="Featured" value={stats.featured} icon={<Star className="h-5 w-5" />} accent="slate" />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-card">
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search testimonials..."
          entriesValue={pageSize}
          onEntriesChange={setPageSize}
          filterValue={statusFilter}
          onFilterChange={(v) => setStatusFilter(v as TestimonialStatus | "All")}
          filterOptions={[
            { label: "All Statuses", value: "All" },
            { label: "Published", value: "Published" },
            { label: "Draft", value: "Draft" },
          ]}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-100 bg-brand-50/60 px-4 py-3">
            <p className="text-sm font-medium text-brand-700">{selectedIds.length} selected</p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleBulkStatus("Published")}
                disabled={isBulkWorking}
                className="rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-100 disabled:opacity-60"
              >
                Bulk Publish
              </button>
              <button
                onClick={() => handleBulkStatus("Draft")}
                disabled={isBulkWorking}
                className="rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-100 disabled:opacity-60"
              >
                Bulk Draft
              </button>
              <button
                onClick={() => setIsBulkDeleteOpen(true)}
                disabled={isBulkWorking}
                className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Bulk Delete
              </button>
            </div>
          </div>
        )}

        {viewMode === "table" && paginated.length > 0 && (
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={paginated.every((t) => selectedIds.includes(t.id))}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
            />
            Select all on this page
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <EmptyState
            title="No testimonials found"
            description="Try a different search term or add a new testimonial."
            actionLabel="Add Testimonial"
            onAction={openAddPage}
          />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginated.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                onEdit={() => openEditForm(t)}
                onDelete={() => setTestimonialToDelete(t)}
              />
            ))}
          </div>
        ) : (
          <TestimonialTable
            testimonials={paginated}
            isLoading={false}
            onEdit={openEditForm}
            onDelete={setTestimonialToDelete}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
          />
        )}

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        isOpen={!!editingTestimonial}
        title="Edit Testimonial"
        subtitle="Update this student testimonial."
        onClose={() => setEditingTestimonial(null)}
      >
        {editingTestimonial && (
          <TestimonialForm
            initialValues={editingTestimonial}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingTestimonial(null)}
            isSaving={isSaving}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      <DeleteModal
        isOpen={!!testimonialToDelete}
        itemName={testimonialToDelete?.name ?? ""}
        onCancel={() => setTestimonialToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <DeleteModal
        isOpen={isBulkDeleteOpen}
        itemName={`${selectedIds.length} selected testimonials`}
        onCancel={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        isDeleting={isBulkWorking}
      />
    </div>
  );
}
