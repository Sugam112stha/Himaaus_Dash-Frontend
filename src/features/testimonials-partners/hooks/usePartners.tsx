import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createPartner, deletePartner, getAllPartners, updatePartner } from "../services/partnerService";
import type { Partner, PartnerFormValues } from "../types/partner";

interface PartnersContextValue {
  partners: Partner[];
  isLoading: boolean;
  error: string | null;
  addPartner: (values: PartnerFormValues) => Promise<void>;
  editPartner: (id: string, values: PartnerFormValues) => Promise<void>;
  removePartner: (id: string) => Promise<void>;
}

const PartnersContext = createContext<PartnersContextValue | null>(null);

export function PartnersProvider({ children }: { children: ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getAllPartners()
      .then((data) => {
        if (isMounted) setPartners(data);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load partners.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const addPartner = useCallback(async (values: PartnerFormValues) => {
    const created = await createPartner(values);
    setPartners((prev) => [created, ...prev]);
  }, []);

  const editPartner = useCallback(async (id: string, values: PartnerFormValues) => {
    const updated = await updatePartner(id, values);
    setPartners((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }, []);

  const removePartner = useCallback(async (id: string) => {
    await deletePartner(id);
    setPartners((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({ partners, isLoading, error, addPartner, editPartner, removePartner }),
    [partners, isLoading, error, addPartner, editPartner, removePartner]
  );

  return <PartnersContext.Provider value={value}>{children}</PartnersContext.Provider>;
}

export function usePartners() {
  const ctx = useContext(PartnersContext);
  if (!ctx) throw new Error("usePartners must be used within a PartnersProvider");
  return ctx;
}
