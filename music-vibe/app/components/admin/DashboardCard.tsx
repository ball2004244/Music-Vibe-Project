import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: IconType;
  href: string;
  iconColor: string;
  iconBgColor: string;
  hoverColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  iconColor,
  iconBgColor,
  hoverColor,
}) => {
  return (
    <Link
      href={href}
      className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
    >
      <div className={`${iconBgColor} p-4 rounded-full mb-4`}>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <h2 
        className={`text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:${hoverColor} transition-colors`}
      >
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </Link>
  );
};

export default DashboardCard;
