import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "dark-gold" | "light-gold" | "blue" | "white";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "dark-gold",
  className = "",
  icon,
}) => {
  const variantStyles = {
    "dark-gold":
      "bg-navy-600/70 border border-gold-400/60 text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] backdrop-blur-md",
    "light-gold":
      "bg-white border border-gold-400/80 text-navy-900 shadow-sm",
    blue:
      "bg-softblue-200 text-softblue-700 border border-softblue-300/60",
    white:
      "bg-white/90 text-navy-900 border border-gray-200/80 shadow-sm",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[12px] font-medium tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
