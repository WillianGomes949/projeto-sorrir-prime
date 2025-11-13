// src/components/ui/Input.tsx

import { useState, type InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: IconType;
  error?: string;
  success?: boolean;
}

export function Input({ 
  label, 
  name, 
  icon: Icon, 
  error,
  success,
  className = "",
  ...rest 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputBase = "w-full px-4 py-3 border-2 bg-white rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1";
  
  const inputStates = {
    normal: "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
    error: "border-red-500 focus:border-red-500 focus:ring-red-200",
    success: "border-green-500 focus:border-green-500 focus:ring-green-200"
  };

  const getInputState = () => {
    if (error) return inputStates.error;
    if (success) return inputStates.success;
    return inputStates.normal;
  };

  return (
    <div className="w-full space-y-2">
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-gray-700 transition-colors duration-300"
      >
        {label}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon 
              className={`
                transition-colors duration-300
                ${error ? 'text-red-500' : 
                  success ? 'text-green-500' : 
                  isFocused ? 'text-blue-500' : 'text-gray-400'}
              `} 
              size={20} 
            />
          </div>
        )}
        
        <input
          id={name}
          name={name}
          className={`
            ${inputBase}
            ${getInputState()}
            ${Icon ? 'pl-11' : 'pl-4'}
            ${className}
            hover:border-gray-400
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        
        {/* Success Checkmark */}
        {success && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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