import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { ImagePlus, RefreshCw, Trash2, Upload } from "lucide-react";
import type { ImageUploaderProps } from "../types/common";

const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4MB

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
  hint = "PNG, JPG or SVG, up to 4MB.",
  error,
  shape = "square",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLocalError("Please upload a valid image file.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setLocalError("Image must be smaller than 4MB.");
      return;
    }
    setLocalError(null);
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-xl";
  const displayError = error ?? localError ?? undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      {value ? (
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <img src={value} alt="Preview" className={`h-16 w-16 border border-slate-100 object-cover ${shapeClass}`} />
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
            isDragging
              ? "border-brand-400 bg-brand-50"
              : displayError
              ? "border-rose-300 bg-rose-50/40"
              : "border-slate-200 bg-slate-50 hover:border-brand-300 hover:bg-brand-50/50"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            {isDragging ? (
              <Upload className="h-4.5 w-4.5 text-brand-600" />
            ) : (
              <ImagePlus className="h-4.5 w-4.5 text-slate-400" />
            )}
          </div>
          <p className="text-sm text-slate-600">
            <span className="font-medium text-brand-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-400">{hint}</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {displayError && <p className="text-xs text-rose-500">{displayError}</p>}
    </div>
  );
}
