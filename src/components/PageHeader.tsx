
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      {description && (
        <p className="text-muted-foreground text-lg max-w-3xl">{description}</p>
      )}
    </div>
  );
};
