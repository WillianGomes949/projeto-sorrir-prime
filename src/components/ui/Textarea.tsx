// src/components/ui/Textarea.tsx

import { useState, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  success?: boolean;
  maxLength?: number;
}

export function Textarea({ 
  label, 
  name, 
  error,
  success,
  maxLength,
  className = "",
  ...rest 
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    rest.onChange?.(e);
  };

  const textareaBase = "w-full px-4 py-3 border-2 bg-white rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none";
  
  const textareaStates = {
    normal: "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400",
    error: "border-red-500 focus:border-red-500 focus:ring-red-200",
    success: "border-green-500 focus:border-green-500 focus:ring-green-200"
  };

  const getTextareaState = () => {
    if (error) return textareaStates.error;
    if (success) return textareaStates.success;
    return textareaStates.normal;
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <label 
          htmlFor={name} 
          className="block text-sm font-semibold text-gray-700 transition-colors duration-300"
        >
          {label}
        </label>
        
        {maxLength && (
          <span className={`text-xs ${
            charCount > maxLength ? 'text-red-500' : 'text-gray-500'
          }`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      
      <div className="relative">
        <textarea
          id={name}
          name={name}
          rows={4}
          className={`
            ${textareaBase}
            ${getTextareaState()}
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          maxLength={maxLength}
          {...rest}
        />

        {/* Success Checkmark */}
        {success && (
          <div className="absolute top-3 right-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}