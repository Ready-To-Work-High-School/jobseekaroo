
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardHeaderProps {
  setActiveTab: (tab: string) => void;
}

const DashboardHeader = ({ setActiveTab }: DashboardHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col items-start justify-between space-y-2 mb-6 md:flex-row md:items-center md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employer Dashboard</h1>
        <p className="text-muted-foreground">
          Connect with Westside High School's Entrepreneurship and Nursing Academy to find pre-trained students
          with industry-recognized credentials who are ready to join your workforce.
        </p>
      </div>
      
      {!isMobile && (
        <Button onClick={() => setActiveTab("create")} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Post New Job
        </Button>
      )}
    </div>
  );
};

export default DashboardHeader;
