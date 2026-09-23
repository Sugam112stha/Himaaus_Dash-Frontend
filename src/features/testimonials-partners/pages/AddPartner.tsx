import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PartnerForm from "../components/PartnerForm";
import { usePartners } from "../hooks/usePartners";
import type { PartnerFormValues } from "../types/partner";

export default function AddPartnerPage() {
  const navigate = useNavigate();
  const { addPartner } = usePartners();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (values: PartnerFormValues) => {
    setIsSaving(true);
    try {
      await addPartner(values);
      navigate("/partners/all-partners");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/partners/all-partners");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Add Partner"
        subtitle="Add a new partner organization."
        backTo="/partners/all-partners"
      />

      <PartnerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSaving={isSaving}
        submitLabel="Add Partner"
      />
    </div>
  );
}
