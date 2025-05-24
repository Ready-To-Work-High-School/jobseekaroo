
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, ChevronRight } from 'lucide-react';
import { ComingSoonFeature } from '@/lib/mock-data/comingSoon';

interface ComingSoonCardProps {
  feature: ComingSoonFeature;
  compact?: boolean;
}

const ComingSoonCard: React.FC<ComingSoonCardProps> = ({ feature, compact = false }) => {
  const getStatusColor = (status: ComingSoonFeature['status']) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-700';
      case 'development': return 'bg-blue-100 text-blue-700';
      case 'testing': return 'bg-yellow-100 text-yellow-700';
      case 'launching': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: ComingSoonFeature['status']) => {
    switch (status) {
      case 'planning': return 'Planning';
      case 'development': return 'In Development';
      case 'testing': return 'Testing';
      case 'launching': return 'Launching Soon';
      default: return 'Coming Soon';
    }
  };

  if (compact) {
    return (
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{feature.title}</CardTitle>
            <Badge className={getStatusColor(feature.status)}>
              {getStatusText(feature.status)}
            </Badge>
          </div>
          <CardDescription className="text-sm">
            {feature.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {feature.estimatedLaunch}
            </div>
            <Button variant="ghost" size="sm">
              Learn More
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      {feature.image && (
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg" />
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{feature.title}</CardTitle>
          <Badge className={getStatusColor(feature.status)}>
            {getStatusText(feature.status)}
          </Badge>
        </div>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          Expected Launch: {feature.estimatedLaunch}
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {feature.features.slice(0, 3).map((featureItem, index) => (
              <li key={index} className="flex items-center text-sm text-muted-foreground">
                <Star className="h-3 w-3 mr-2 text-yellow-500" />
                {featureItem}
              </li>
            ))}
            {feature.features.length > 3 && (
              <li className="text-sm text-muted-foreground ml-5">
                +{feature.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        <Button className="w-full" variant="outline">
          Get Notified When Available
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComingSoonCard;
