interface EntriesSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
}

export default function EntriesSelector({ value, onChange, options = [5, 10, 25, 50] }: EntriesSelectorProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-500">
      Show
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      entries
    </label>
  );
}
