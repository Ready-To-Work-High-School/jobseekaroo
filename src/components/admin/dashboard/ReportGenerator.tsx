
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BarChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ReportGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Generate Reports</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button
            onClick={() => {
              toast({
                title: "Generating User Report",
                description: "Your report will be ready for download shortly."
              });
            }}
            className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground"
          >
            <FileText className="h-4 w-4" />
            User Activity Report
          </Button>
          <Button
            onClick={() => {
              toast({
                title: "Generating System Report",
                description: "System statistics report is being prepared."
              });
            }}
            className="w-full flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground"
          >
            <BarChart className="h-4 w-4" />
            System Statistics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
