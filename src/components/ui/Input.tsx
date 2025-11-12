// src/components/ui/Input.tsx
import type { InputHTMLAttributes } from "react";

// Aceita todas as props de um <input> normal
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  placeholder?: string;
  
}

export function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...rest}
      />
    </div>
  );
}