
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface CeoFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const CeoFeatureCard: React.FC<CeoFeatureCardProps> = ({ icon, title, description, children }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

export default CeoFeatureCard;
