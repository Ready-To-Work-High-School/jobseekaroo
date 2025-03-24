
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileActionsSheetProps {
  selectedCodesCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
  onExport: () => void;
  onPrint: () => void;
  onEmailSelected: () => void;
  onDeleteSelected: () => void;
}

const MobileActionsSheet: React.FC<MobileActionsSheetProps> = ({
  selectedCodesCount,
  isRefreshing,
  onRefresh,
  onExport,
  onPrint,
  onEmailSelected,
  onDeleteSelected
}) => {
  return (
    <div className="flex md:hidden justify-between items-center p-4 border-b">
      <h3 className="text-base font-semibold">Redemption Codes</h3>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            Actions
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4">Code Actions</h3>
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRefresh}
                disabled={isRefreshing}
                className="justify-start"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh Codes'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onExport}
                className="justify-start"
              >
                Export Codes
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onPrint}
                className="justify-start"
              >
                Print Codes
              </Button>
              
              {selectedCodesCount > 0 && (
                <>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Selected: {selectedCodesCount} codes
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={onEmailSelected}
                    className="justify-start"
                  >
                    Email Selected
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={onDeleteSelected}
                    className="justify-start"
                  >
                    Delete Selected
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileActionsSheet;
