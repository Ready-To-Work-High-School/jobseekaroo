
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';

interface PremiumManagementHeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

const PremiumManagementHeader = ({ loading, onRefresh }: PremiumManagementHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-amber-500 mr-2" /> 
            Premium Management
          </CardTitle>
          <CardDescription>Grant or revoke premium privileges to users</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
        </Button>
      </div>
    </CardHeader>
  );
};

export default PremiumManagementHeader;
