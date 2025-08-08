import React from 'react';
import { clsx } from 'clsx';

// DaisyUI Button component with ShadCN-like API
export function Button({
  className,
  variant = "default", 
  size = "default",
  asChild = false,
  children,
  style,
  ...props
}) {
  const Comp = asChild ? "span" : "button";
  
  // Map variants to DaisyUI classes
  const variantClasses = {
    default: "btn-primary",
    destructive: "btn-error",
    outline: "btn-outline", 
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "btn-link"
  };

  // Map sizes to DaisyUI classes
  const sizeClasses = {
    default: "btn-md",
    sm: "btn-sm", 
    lg: "btn-lg",
    icon: "btn-square btn-md"
  };
  
  const buttonClasses = clsx(
    "btn",
    "border-0", // Remove default borders for custom styling
    "outline-none", // Remove focus outlines that might interfere
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    className
  );

  if (asChild) {
    return (
      <span className={buttonClasses} style={style}>
        {children}
      </span>
    );
  }

  return (
    <Comp 
      className={buttonClasses}
      style={style}
      {...props}
    >
      {children}
    </Comp>
  );
}

export const buttonVariants = {}; // Keep for compatibility
