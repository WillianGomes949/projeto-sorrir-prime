// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { LuLoader } from "react-icons/lu";

interface BaseButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  rounded = "xl",
  fullWidth = false,
  className = "",
  disabled = false,
  ...rest
}: ButtonProps) {
  // Base styles
  const baseStyle = `
    inline-flex items-center justify-center gap-3
    font-semibold transition-all duration-300 ease-out
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-95 backdrop-blur-sm
    group relative overflow-hidden
  `;

  // Size variants
  const sizeStyles = {
    sm: "py-2.5 px-5 text-sm",
    md: "py-3.5 px-7 text-base",
    lg: "py-4 px-8 text-lg",
    xl: "py-5 px-10 text-xl"
  };

  // Rounded variants
  const roundedStyles = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full"
  };

  // Color variants
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600 to-cyan-600
      text-white border-transparent
      hover:from-blue-700 hover:to-cyan-700
      focus:ring-blue-500/50 focus:ring-offset-white
      shadow-lg hover:shadow-2xl hover:shadow-blue-500/25
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-800
      text-white border-transparent
      hover:from-gray-800 hover:to-gray-900
      focus:ring-gray-500/50 focus:ring-offset-white
      shadow-lg hover:shadow-2xl hover:shadow-gray-500/20
    `,
    outline: `
      bg-transparent text-blue-600 border-blue-600
      hover:bg-blue-600 hover:text-white hover:border-blue-600
      focus:ring-blue-500/50 focus:ring-offset-white
      shadow-lg hover:shadow-2xl hover:shadow-blue-500/20
    `,
    ghost: `
      bg-transparent text-gray-700 border-transparent
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-500/50 focus:ring-offset-white
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-500
      text-white border-transparent
      hover:from-red-600 hover:to-pink-600
      focus:ring-red-500/50 focus:ring-offset-white
      shadow-lg hover:shadow-2xl hover:shadow-red-500/25
    `
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";
  
  const combinedClassName = `
    ${baseStyle}
    ${sizeStyles[size]}
    ${roundedStyles[rounded]}
    ${variantStyles[variant]}
    ${widthStyle}
    ${loading ? "cursor-wait" : ""}
    ${!disabled && !loading ? "hover:scale-105" : ""}
    ${className}
  `.replace(/\s+/g, " ").trim();

  // Process children - preserve original text case but add tracking
  const buttonContent = Array.isArray(children) 
    ? children.map(child => 
        typeof child === "string" 
          ? <span key={child} className="tracking-wide">{child}</span>
          : child
      )
    : typeof children === "string" 
      ? <span className="tracking-wide">{children}</span>
      : children;

  // Common props for both button and link
  const commonProps = {
    className: combinedClassName,
    "data-variant": variant,
    "data-size": size,
    "data-loading": loading,
    ...(disabled && { "aria-disabled": true })
  };

  // Content with loading state
  const renderContent = () => (
    <>
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
          <LuLoader className="animate-spin h-5 w-5" />
        </div>
      )}
      
      {/* Icon and text content */}
      <div className={`flex items-center gap-3 transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"}`}>
        {icon && iconPosition === "left" && (
          <span className="shrink-0 group-hover:scale-110 transition-transform duration-200">
            {icon}
          </span>
        )}
        
        {buttonContent}
        
        {icon && iconPosition === "right" && (
          <span className="shrink-0 group-hover:scale-110 transition-transform duration-200">
            {icon}
          </span>
        )}
      </div>

      {/* Ripple effect layer */}
      <div className="absolute inset-0 overflow-hidden rounded-inherit">
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
    </>
  );

  // Render as Link if href is provided
  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    
    return (
      <a
        href={href}
        {...commonProps}
        {...linkRest as AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {renderContent()}
      </a>
    );
  }

  // Render as button
  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      {...commonProps}
      {...buttonRest}
    >
      {renderContent()}
    </button>
  );
}