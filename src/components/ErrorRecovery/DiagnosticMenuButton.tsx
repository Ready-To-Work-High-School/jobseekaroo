
import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useDiagnosticService } from './diagnosticService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { getSessionErrors } from './errorTracker';

interface DiagnosticMenuButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

const DiagnosticMenuButton: React.FC<DiagnosticMenuButtonProps> = ({ 
  variant = "outline", 
  size = "default" 
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const { runDiagnostics } = useDiagnosticService();
  const { toast } = useToast();
  const navigate = useNavigate();
  const errors = getSessionErrors();
  
  const quickCheck = async () => {
    setIsChecking(true);
    try {
      const results = await runDiagnostics();
      
      if (results.issues.length === 0) {
        toast({
          title: "System check passed",
          description: "No issues detected",
        });
      } else {
        toast({
          title: "Issues detected",
          description: `Found ${results.issues.length} issue(s)`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during quick check:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const navigateToDiagnosticPage = () => {
    navigate('/system-diagnostics');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="relative">
          <Shield className="h-3.5 w-3.5 mr-2" />
          System Check
          {errors.length > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {errors.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>System Health</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={quickCheck}
          disabled={isChecking}
          className="flex items-center cursor-pointer"
        >
          {isChecking ? (
            <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-blue-600 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
          )}
          Run Quick Check
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={navigateToDiagnosticPage}
          className="flex items-center cursor-pointer"
        >
          <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
          Advanced Diagnostics
          <ArrowRight className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        
        {errors.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Recent Issues: {errors.length}
            </DropdownMenuLabel>
            
            {errors.slice(0, 3).map((error, index) => (
              <DropdownMenuItem key={index} className="text-xs truncate text-destructive">
                {error.message || "Unknown error"}
              </DropdownMenuItem>
            ))}
            
            {errors.length > 3 && (
              <DropdownMenuItem className="text-xs text-muted-foreground italic">
                {errors.length - 3} more issues...
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DiagnosticMenuButton;
