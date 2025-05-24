
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Rocket } from 'lucide-react';
import ComingSoonCard from './ComingSoonCard';
import { ComingSoonFeature } from '@/lib/mock-data/comingSoon';

interface ComingSoonSectionProps {
  title?: string;
  description?: string;
  features: ComingSoonFeature[];
  compact?: boolean;
  showHeader?: boolean;
}

const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({ 
  title = "Coming Soon",
  description = "Exciting new features in development",
  features,
  compact = false,
  showHeader = true
}) => {
  if (features.length === 0) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Rocket className="h-5 w-5 mr-2" />
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="text-center py-12">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-4" />
          <h3 className="text-lg font-medium mb-2">New Features Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're working hard to bring you exciting new features. Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center mb-2">
            <Rocket className="h-6 w-6 mr-2" />
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className={`grid gap-6 ${compact ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {features.map((feature) => (
          <ComingSoonCard key={feature.id} feature={feature} compact={compact} />
        ))}
      </div>
    </div>
  );
};

export default ComingSoonSection;
