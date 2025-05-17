
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const PremiumFeaturesBanner = () => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
      <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Star className="h-5 w-5 text-amber-500 mr-2" />
          <div>
            <h3 className="font-medium text-sm">Unlock Premium Features</h3>
            <p className="text-xs text-muted-foreground">Featured listings, advanced analytics, and more</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="bg-white border-amber-300 hover:bg-amber-50">
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumFeaturesBanner;
