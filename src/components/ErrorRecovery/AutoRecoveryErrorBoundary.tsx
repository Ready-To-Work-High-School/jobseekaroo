
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackError } from './errorTracker';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  maxAutoRecoveryAttempts?: number;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  recoveryAttempts: number;
  isRecovering: boolean;
}

// Toast provider wrapper to use hooks within class component
const ToastErrorBoundary = (props: ErrorBoundaryProps) => {
  const { toast } = useToast();
  return <AutoRecoveryErrorBoundary {...props} toastFn={toast} />;
};

class AutoRecoveryErrorBoundary extends Component<
  ErrorBoundaryProps & { toastFn?: Function },
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps & { toastFn?: Function }) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      recoveryAttempts: 0,
      isRecovering: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by AutoRecoveryErrorBoundary:', error, errorInfo);
    trackError(error, errorInfo);
    
    // Try automatic recovery if we haven't exceeded max attempts
    const maxAttempts = this.props.maxAutoRecoveryAttempts || 2;
    if (this.state.recoveryAttempts < maxAttempts) {
      this.setState({ isRecovering: true });
      
      setTimeout(() => {
        this.setState(prevState => ({
          hasError: false,
          recoveryAttempts: prevState.recoveryAttempts + 1,
          isRecovering: false
        }));
        
        if (this.props.toastFn) {
          this.props.toastFn({
            title: "Auto-recovery attempted",
            description: `Attempting to fix error (${this.state.recoveryAttempts + 1}/${maxAttempts})`,
            variant: "default",
          });
        }
      }, 2000); // Wait 2 seconds before recovery attempt
    } else if (this.props.toastFn) {
      this.props.toastFn({
        title: "Error detected",
        description: "Maximum auto-recovery attempts reached. Please try manual reset.",
        variant: "destructive",
      });
    }
  }

  resetErrorBoundary = (): void => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    
    this.setState({
      hasError: false,
      error: null,
      recoveryAttempts: 0,
      isRecovering: false
    });
  };

  render(): ReactNode {
    const { hasError, error, isRecovering } = this.state;
    const { children, fallback } = this.props;

    if (isRecovering) {
      return (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-center gap-2">
            <RefreshCcw className="h-5 w-5 text-amber-600 animate-spin" />
            <p className="text-amber-800">Attempting to recover from error...</p>
          </div>
        </div>
      );
    }

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="ml-2">Something went wrong</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              {error?.message || 'An unexpected error occurred'}
            </p>
            <Button 
              onClick={this.resetErrorBoundary}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return children;
  }
}

export default ToastErrorBoundary;
