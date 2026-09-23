import type { ReactNode } from "react";

export type Accent = "blue" | "green" | "amber" | "red" | "slate";

export interface Trend {
  value: string; // e.g. "+12%"
  direction: "up" | "down";
}

export interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: Accent;
  hint?: string;
  trend?: Trend;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render: (row: T) => ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export type BadgeTone = "green" | "slate" | "red" | "blue" | "amber";

export interface StatusBadgeProps {
  status: string;
  tone: BadgeTone;
}

export interface ImageUploaderProps {
  value: string;
  onChange: (dataUrl: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  shape?: "square" | "circle";
}

export interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type ViewMode = "grid" | "table";

/** Generic async request state, used by every entity hook. */
export interface AsyncState {
  isLoading: boolean;
  error: string | null;
}
