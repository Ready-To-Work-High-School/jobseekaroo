
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PremiumFeaturesBanner = () => {
  return (
    <Card className="mb-6 border-amber-200">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Crown className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-medium">Boost Your Hiring with Premium Features</h3>
              <p className="text-sm text-muted-foreground">
                Branded listings, skill matching, analytics, and more
              </p>
            </div>
          </div>
          
          <Button 
            asChild 
            size="sm" 
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            <Link to="/employer/premium" className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1" /> 
              Explore Premium
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeaturesBanner;
