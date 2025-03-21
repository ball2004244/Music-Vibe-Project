import { ButtonProps } from "@/app/types/admin";

const variantStyles = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white",
  secondary:
    "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white",
  danger:
    "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/60",
  success:
    "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/60",
};

export const Button = ({
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium
        transition-colors shadow-sm
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="text-xl" />}
      {children}
    </button>
  );
};
