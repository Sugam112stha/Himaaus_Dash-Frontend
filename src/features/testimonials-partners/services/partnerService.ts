import { partnersData } from "../data/dummyData";
import type { Partner, PartnerFormValues } from "../types/partner";

/**
 * Simulated backend for Partners. Swap the internals for real `fetch` calls
 * when an API is available — hooks/usePartners.ts is the only caller.
 */
let partners: Partner[] = [...partnersData];

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getAllPartners(): Promise<Partner[]> {
  return delay([...partners]);
}

export async function createPartner(values: PartnerFormValues): Promise<Partner> {
  const newPartner: Partner = {
    ...values,
    id: `ptn_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  partners = [newPartner, ...partners];
  return delay(newPartner);
}

export async function updatePartner(id: string, values: PartnerFormValues): Promise<Partner> {
  partners = partners.map((p) => (p.id === id ? { ...p, ...values } : p));
  const updated = partners.find((p) => p.id === id)!;
  return delay(updated);
}

export async function deletePartner(id: string): Promise<void> {
  partners = partners.filter((p) => p.id !== id);
  return delay(undefined);
}
