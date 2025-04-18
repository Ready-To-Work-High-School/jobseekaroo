
import React from 'react';
import { Crown, Heart, Shield } from 'lucide-react';

const CeoHeader = () => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-100 via-blue-100 to-amber-100 p-2 rounded-md border border-amber-200/50">
          <Shield className="h-5 w-5 text-purple-600" />
          <Heart 
            className="h-5 w-5" 
            style={{
              fill: "url(#ceoPortalGradient)",
              stroke: "none"
            }}
          />
          <Crown className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-1">CEO Portal</h1>
          <p className="text-muted-foreground">
            Access all platform administrative functions with highest level privileges
          </p>
        </div>
      </div>
      
      <svg width="0" height="0">
        <defs>
          <linearGradient id="ceoPortalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#9333EA' }} />
            <stop offset="50%" style={{ stopColor: '#3B82F6' }} />
            <stop offset="100%" style={{ stopColor: '#F59E0B' }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CeoHeader;
