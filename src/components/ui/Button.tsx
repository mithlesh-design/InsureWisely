import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "outline-dark" | "pill";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-500/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-sm px-4 py-2 rounded-md h-[38px]",
    md: "text-base px-6 py-3.5 rounded-lg h-[50px]",
    lg: "text-base px-8 py-4 rounded-lg h-[60px]",
  };

  const variantStyles = {
    primary:
      "bg-coral-500 hover:bg-coral-600 text-white shadow-md hover:shadow-lg active:scale-[0.99]",
    secondary:
      "bg-transparent hover:bg-white/10 text-white border border-white/30 backdrop-blur-sm active:scale-[0.99]",
    dark:
      "bg-navy-900 hover:bg-navy-800 text-white shadow-md hover:shadow-lg active:scale-[0.99]",
    "outline-dark":
      "bg-transparent hover:bg-navy-900/5 text-navy-900 border border-navy-900/20 active:scale-[0.99]",
    pill:
      "bg-coral-500 hover:bg-coral-600 text-white rounded-full px-6 py-2 text-sm shadow-md active:scale-[0.99]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
