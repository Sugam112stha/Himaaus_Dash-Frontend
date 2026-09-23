import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import type { IconPickerProps } from "../types/common";
import { milestoneIconOptions } from "../data/dummyData";

const iconMap = Icons as unknown as Record<string, LucideIcon>;

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const SelectedIcon = iconMap[value] ?? Icons.HelpCircle;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">Icon</label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
          <SelectedIcon className="h-5 w-5 text-brand-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">{value}</p>
          <p className="text-xs text-slate-400">Selected icon</p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-8">
        {milestoneIconOptions.map((name) => {
          const IconComp = iconMap[name];
          if (!IconComp) return null;
          const isSelected = name === value;
          return (
            <button
              key={name}
              type="button"
              title={name}
              onClick={() => onChange(name)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition ${
                isSelected ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <IconComp className="h-4.5 w-4.5" />
              {isSelected && (
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                  <Check className="h-2.5 w-2.5 text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
