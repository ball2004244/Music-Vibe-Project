import React from "react";
import { Button } from "./Button";
import { IconType } from "react-icons";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actionButton?: {
    label: string;
    icon?: IconType;
    onClick: () => void;
    disabled?: boolean;
  };
  additionalButtons?: React.ReactNode;
}

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  description,
  actionButton,
  additionalButtons,
}) => {
  return (
    <section className="mb-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      <div className="flex gap-2">
        {actionButton && (
          <Button
            icon={actionButton.icon}
            onClick={actionButton.onClick}
            disabled={actionButton.disabled}
          >
            {actionButton.label}
          </Button>
        )}
        {additionalButtons}
      </div>
    </section>
  );
};

export default AdminPageHeader;
