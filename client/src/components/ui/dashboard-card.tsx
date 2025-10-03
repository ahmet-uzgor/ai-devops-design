import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function DashboardCard({ children, className = "", collapsible = false, defaultOpen = true }: DashboardCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!collapsible) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`} data-collapsible="true">
      <DashboardCardContext.Provider value={{ isOpen, setIsOpen, collapsible }}>
        {children}
      </DashboardCardContext.Provider>
    </div>
  );
}

import { createContext, useContext } from 'react';

interface DashboardCardContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  collapsible: boolean;
}

const DashboardCardContext = createContext<DashboardCardContextType | null>(null);

interface DashboardCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCardHeader({ children, className = "" }: DashboardCardHeaderProps) {
  const context = useContext(DashboardCardContext);

  if (!context || !context.collapsible) {
    return (
      <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
      </div>
    );
  }

  const { isOpen, setIsOpen } = context;

  return (
    <div 
      className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      data-testid="collapsible-header"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">{children}</div>
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          data-testid="collapse-icon"
        />
      </div>
    </div>
  );
}

interface DashboardCardContentProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCardContent({ children, className = "" }: DashboardCardContentProps) {
  const context = useContext(DashboardCardContext);

  if (!context || !context.collapsible) {
    return (
      <div className={`px-6 py-4 ${className}`}>
        {children}
      </div>
    );
  }

  const { isOpen } = context;

  if (!isOpen) {
    return null;
  }

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
    <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </h3>
  );
}