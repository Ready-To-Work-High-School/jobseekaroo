
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ApplicationErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ApplicationErrorState = ({ message, onRetry }: ApplicationErrorStateProps) => {
  return (
    <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 mt-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-destructive">Error</h3>
          <div className="mt-1 text-sm text-destructive/80">
            <p>{message}</p>
          </div>
          <div className="mt-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-destructive/40 hover:bg-destructive/10"
              onClick={onRetry}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationErrorState;
