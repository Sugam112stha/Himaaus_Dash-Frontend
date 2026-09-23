import type { ReactNode } from "react";
import { LayoutGrid, Rows3 } from "lucide-react";
import SearchBar from "./SearchBar";
import EntriesSelector from "./EntriesSelector";
import FilterDropdown from "./FilterDropdown";
import type { SelectOption, ViewMode } from "../types/common";

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  entriesValue: number;
  onEntriesChange: (value: number) => void;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: SelectOption[];
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  action?: ReactNode;
}

export default function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  entriesValue,
  onEntriesChange,
  filterValue,
  onFilterChange,
  filterOptions,
  viewMode,
  onViewModeChange,
  action,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />
        {filterOptions && onFilterChange && (
          <FilterDropdown value={filterValue ?? "All"} onChange={onFilterChange} options={filterOptions} />
        )}
        <EntriesSelector value={entriesValue} onChange={onEntriesChange} />
      </div>
      <div className="flex items-center gap-3">
        {viewMode && onViewModeChange && (
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              title="Grid view"
              className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                viewMode === "grid" ? "bg-white text-brand-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              title="Table view"
              className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                viewMode === "table" ? "bg-white text-brand-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Rows3 className="h-4 w-4" />
            </button>
          </div>
        )}
        {action}
      </div>
    </div>
  );
}
