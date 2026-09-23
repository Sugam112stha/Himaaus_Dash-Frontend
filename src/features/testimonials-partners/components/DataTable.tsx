import type { TableColumn } from "../types/common";
import EmptyState from "./EmptyState";

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  skeletonRows?: number;
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  isLoading = false,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your search or add a new entry.",
  skeletonRows = 5,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={`whitespace-nowrap border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
                  col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={`skeleton-${i}`} className="border-b border-slate-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-4">
                    <div className="skeleton h-4 w-full max-w-[140px] rounded" />
                  </td>
                ))}
              </tr>
            ))}

          {!isLoading && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2">
                <EmptyState title={emptyTitle} description={emptyDescription} />
              </td>
            </tr>
          )}

          {!isLoading &&
            rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/70">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 align-middle ${
                      col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
