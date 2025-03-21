import React from "react";

interface EmptyStateProps {
  message: string;
  type?: "warning" | "info";
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  type = "info" 
}) => {
  const styles = {
    info: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4",
  };

  const textStyles = {
    info: "text-yellow-800 dark:text-yellow-200 text-lg",
    warning: "text-yellow-800",
  };

  return (
    <div className={styles[type]}>
      <p className={textStyles[type]}>{message}</p>
    </div>
  );
};

export default EmptyState;
