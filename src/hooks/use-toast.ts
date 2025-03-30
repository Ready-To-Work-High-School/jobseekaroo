
import {
  toast,
  useToast as useToastOriginal,
} from "@/components/ui/use-toast";

export { toast };

export const useToast = () => {
  return useToastOriginal();
};
