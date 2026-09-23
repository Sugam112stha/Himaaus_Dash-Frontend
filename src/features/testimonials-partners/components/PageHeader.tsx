import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  action?: ReactNode;
  backTo?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, action, backTo }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-brand-600">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-500">{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-3">
          {backTo && (
            <Link
              to={backTo}
              aria-label="Go back"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
      </div>
      {action}
    </div>
  );
}
