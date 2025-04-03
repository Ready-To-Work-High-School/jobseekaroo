
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Database, BookOpen } from 'lucide-react';

const DashboardHeader = () => {
  const { userProfile } = useAuth();
  
  // Check if user is CEO based on job title or company name
  const isCeo = userProfile?.job_title?.toLowerCase().includes('ceo') || 
               userProfile?.job_title?.toLowerCase().includes('chief executive') ||
               userProfile?.company_name?.toLowerCase().includes('ceo');
  
  return (
    <div className="space-y-4 mb-8">
      <h1 className="text-3xl font-bold">
        {isCeo ? "CEO Job Management Dashboard" : "Employer Dashboard"}
      </h1>
      
      <p className="text-muted-foreground">
        Manage your job postings and track applicants in one place
      </p>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge variant="outline" className="gap-1">
          <Database className="h-3.5 w-3.5" />
          Supabase
        </Badge>
        <Badge variant="outline" className="gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          API Documentation
        </Badge>
        <Badge variant="outline" className="gap-1">
          Render
        </Badge>
      </div>
    </div>
  );
};

export default DashboardHeader;
