
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Palette, Sparkles } from 'lucide-react';

export const BrandedListingFeature = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Palette className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Branded Job Listings</h3>
          <p className="text-sm text-muted-foreground">Stand out with your brand identity</p>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Custom company colors and logo integration
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Enhanced visual branding
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
