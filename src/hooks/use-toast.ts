
import { useToast as useToastOriginal, type ToastActionElement } from "@/components/ui/toast";

export type ToastProps = {
  title?: string;
  description?: string;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;
};

// Re-export the useToast hook
export const useToast = useToastOriginal;

// Define the toast function here instead of importing it
export const toast = ({ title, description, action, variant, duration }: ToastProps) => {
  const { toast } = useToastOriginal();
  
  return toast({
    title,
    description,
    action,
    variant: variant || "default",
    duration: duration,
  });
};
