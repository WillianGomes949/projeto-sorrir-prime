// src/components/ui/Textarea.tsx

import type { TextareaHTMLAttributes } from "react";



interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

export function Textarea({ label, name, ...rest }: TextareaProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...rest}
      />
    </div>
  );
}