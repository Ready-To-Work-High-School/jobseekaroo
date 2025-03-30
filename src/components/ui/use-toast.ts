
// This file is a simple re-export from the hooks file
// No circular dependency since we're not importing toast from hooks
import { useToast } from "@/components/ui/toast";

export { useToast };

// Re-export the toast function from hooks
export { toast } from "@/hooks/use-toast";
