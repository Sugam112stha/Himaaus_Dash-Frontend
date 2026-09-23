import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe2, Plus, ToggleLeft, ToggleRight, Users, ExternalLink } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatsCard from "../components/StatsCard";
import TableToolbar from "../components/TableToolbar";
import PartnerGrid from "../components/PartnerGrid";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import DeleteModal from "../components/DeleteModal";
import PartnerForm from "../components/PartnerForm";
import { usePartners } from "../hooks/usePartners";
import type { Partner, PartnerFormValues, PartnerStatus } from "../types/partner";
import type { TableColumn, ViewMode } from "../types/common";

export default function PartnersPage() {
  const { partners, isLoading, editPartner, removePartner } = usePartners();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PartnerStatus | "All">("All");
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, pageSize, statusFilter]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return partners.filter((p) => {
      const matchesTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.country.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesTerm && matchesStatus;
    });
  }, [partners, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const stats = useMemo(() => {
    const active = partners.filter((p) => p.status === "Active").length;
    const categories = new Set(partners.map((p) => p.category)).size;
    return {
      total: partners.length,
      active,
      inactive: partners.length - active,
      categories,
    };
  }, [partners]);

  const openAddPage = () => {
    navigate("/partners/add-partner");
  };

  const openEditForm = (partner: Partner) => {
    setEditingPartner(partner);
  };

  const handleEditSubmit = async (values: PartnerFormValues) => {
    if (!editingPartner) return;
    setIsSaving(true);
    try {
      await editPartner(editingPartner.id, values);
      setEditingPartner(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!partnerToDelete) return;
    setIsDeleting(true);
    try {
      await removePartner(partnerToDelete.id);
      setPartnerToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const tableColumns: TableColumn<Partner>[] = [
    {
      key: "logo",
      header: "Logo",
      width: "72px",
      render: (row) => (
        <img src={row.logo} alt={row.name} className="h-10 w-10 rounded-lg border border-slate-100 object-cover" />
      ),
    },
    {
      key: "name",
      header: "Partner Name",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-800">{row.name}</p>
          <p className="text-xs text-slate-400">{row.website.replace(/^https?:\/\//, "")}</p>
        </div>
      ),
    },
    { key: "country", header: "Country", render: (row) => <span className="text-slate-600">{row.country}</span> },
    {
      key: "category",
      header: "Category",
      render: (row) => (
        <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
          {row.category}
        </span>
      ),
    },
    {
      key: "website",
      header: "Website",
      render: (row) => (
        <a
          href={row.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline"
        >
          Visit
          <ExternalLink className="h-3 w-3" />
        </a>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} tone={row.status === "Active" ? "green" : "slate"} />,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => <ActionButtons onEdit={() => openEditForm(row)} onDelete={() => setPartnerToDelete(row)} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="All Partners"
        subtitle="Manage universities, educational institutions, and partner organizations."
        action={
          <button
            onClick={openAddPage}
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Partner
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard label="Total Partners" value={stats.total} icon={<Users className="h-5 w-5" />} accent="blue" />
        <StatsCard
          label="Active Partners"
          value={stats.active}
          icon={<ToggleRight className="h-5 w-5" />}
          accent="green"
        />
        <StatsCard
          label="Inactive Partners"
          value={stats.inactive}
          icon={<ToggleLeft className="h-5 w-5" />}
          accent="slate"
        />
        <StatsCard label="Categories" value={stats.categories} icon={<Globe2 className="h-5 w-5" />} accent="amber" />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-card">
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search partners..."
          entriesValue={pageSize}
          onEntriesChange={setPageSize}
          filterValue={statusFilter}
          onFilterChange={(v) => setStatusFilter(v as PartnerStatus | "All")}
          filterOptions={[
            { label: "All Statuses", value: "All" },
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ]}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {viewMode === "grid" ? (
          <PartnerGrid
            partners={paginated}
            isLoading={isLoading}
            onEdit={openEditForm}
            onDelete={setPartnerToDelete}
          />
        ) : (
          <DataTable
            columns={tableColumns}
            rows={paginated}
            rowKey={(row) => row.id}
            isLoading={isLoading}
            emptyTitle="No partners found"
            emptyDescription="Try a different search term or add a new partner."
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
        isOpen={!!editingPartner}
        title="Edit Partner"
        subtitle="Update this partner's details."
        onClose={() => setEditingPartner(null)}
      >
        {editingPartner && (
          <PartnerForm
            initialValues={editingPartner}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingPartner(null)}
            isSaving={isSaving}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      <DeleteModal
        isOpen={!!partnerToDelete}
        itemName={partnerToDelete?.name ?? ""}
        onCancel={() => setPartnerToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
