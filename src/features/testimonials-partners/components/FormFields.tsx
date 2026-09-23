import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { SelectOption } from "../types/common";

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
}

const baseFieldStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";

function FieldShell({ label, required, hint, error, children }: FieldWrapperProps & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}

type InputProps = FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, required, hint, error, className, ...rest }: InputProps) {
  return (
    <FieldShell label={label} required={required} hint={hint} error={error}>
      <input
        {...rest}
        className={`${baseFieldStyles} ${error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : ""} ${className ?? ""}`}
      />
    </FieldShell>
  );
}

type TextAreaProps = FieldWrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ label, required, hint, error, className, ...rest }: TextAreaProps) {
  return (
    <FieldShell label={label} required={required} hint={hint} error={error}>
      <textarea
        {...rest}
        className={`${baseFieldStyles} min-h-[100px] resize-y ${error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : ""} ${className ?? ""}`}
      />
    </FieldShell>
  );
}

type SelectProps = FieldWrapperProps & SelectHTMLAttributes<HTMLSelectElement> & { options: SelectOption[] };

export function Select({ label, required, hint, error, options, className, ...rest }: SelectProps) {
  return (
    <FieldShell label={label} required={required} hint={hint} error={error}>
      <select
        {...rest}
        className={`${baseFieldStyles} ${error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : ""} ${className ?? ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
