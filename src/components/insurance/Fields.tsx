import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

// Figma "Input" component: 12px tracked uppercase label, 48px tinted control, 8px apart
type FieldProps = { label: string; full?: boolean };

export function TextField({ label, full, ...input }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return <label className={`ti-field ${full ? "ti-field-full" : ""}`}>
    <span className="ti-label">{label}</span>
    <input className="ti-control" {...input} />
  </label>;
}

export function SelectField({ label, full, options, placeholder, muted, ...select }: FieldProps & {
  options: string[]; placeholder?: string; muted?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return <label className={`ti-field ${full ? "ti-field-full" : ""}`}>
    <span className="ti-label">{label}</span>
    <select className={`ti-control ${muted ? "ti-control-muted" : ""}`} {...select}>
      {placeholder !== undefined && <option value="" disabled hidden>{placeholder}</option>}
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>;
}
