// src/components/ui/Select.tsx

import type { ReactNode, SelectHTMLAttributes } from "react";


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  children: ReactNode; // Para passar os <option>
}

export function Select({ label, name, children, ...rest }: SelectProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}