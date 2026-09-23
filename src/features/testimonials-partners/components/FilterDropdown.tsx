import { ChevronDown, ListFilter } from "lucide-react";
import type { SelectOption } from "../types/common";

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
}

export default function FilterDropdown({ value, onChange, options, label }: FilterDropdownProps) {
  return (
    <label className="relative flex items-center gap-2 text-sm text-slate-500">
      {label && <span className="hidden sm:inline">{label}</span>}
      <span className="relative">
        <ListFilter className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-8 text-sm text-slate-700 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      </span>
    </label>
  );
}
