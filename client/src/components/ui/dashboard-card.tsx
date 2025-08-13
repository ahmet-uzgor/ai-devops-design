import { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ children, className = "" }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

interface DashboardCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCardHeader({ children, className = "" }: DashboardCardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

interface DashboardCardContentProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCardContent({ children, className = "" }: DashboardCardContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

interface DashboardCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCardTitle({ children, className = "" }: DashboardCardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}