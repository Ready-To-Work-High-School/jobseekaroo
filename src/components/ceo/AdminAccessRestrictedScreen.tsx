
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowLeft, Heart } from 'lucide-react';

const AdminAccessRestrictedScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 px-6 pb-6 text-center">
          <div className="flex justify-center">
            <div className="relative h-20 w-20 mb-4">
              <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse opacity-70"></div>
              <div className="relative flex items-center justify-center h-full">
                <Shield className="h-10 w-10 text-red-500" />
                <Lock className="h-6 w-6 absolute text-red-600" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">CEO Access Restricted</h2>
          
          <p className="text-muted-foreground mb-4">
            This area requires CEO privileges to access. Please contact your system administrator if you believe this is an error.
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md flex items-center">
              <div className="mr-3 bg-amber-100 dark:bg-amber-800/30 p-2 rounded-full">
                <div className="flex">
                  <Shield className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  <Heart 
                    className="h-4 w-4 ml-0.5" 
                    style={{
                      fill: "url(#ceoPortalGradient)",
                      stroke: "none"
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-400">
                CEO privileges include managing all aspects of the platform, user privileges, redemption codes, and trial periods.
              </p>
            </div>
            
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go to Admin Panel
            </Button>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccessRestrictedScreen;
