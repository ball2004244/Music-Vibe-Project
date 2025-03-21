import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backHref?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: IconType;
}

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}