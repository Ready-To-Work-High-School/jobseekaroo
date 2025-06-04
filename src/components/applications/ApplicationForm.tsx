
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ApplicationFormProps {
  jobId?: string;
  jobTitle?: string;
  companyName?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  jobId,
  jobTitle,
  companyName
}) => {
  const [formData, setFormData] = useState({
    positionTitle: jobTitle || '',
    company: companyName || '',
    status: 'applied',
    applicationDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const { user, createApplication } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to track applications",
        variant: "destructive",
      });
      return;
    }

    try {
      await createApplication(jobId || '', {
        job_id: jobId || '',
        job_title: formData.positionTitle,
        company: formData.company,
        status: formData.status,
        applied_date: formData.applicationDate,
        notes: formData.notes,
        priority: 'medium'
      });

      toast({
        title: "Success",
        description: "Application tracked successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to track application",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="position-title" className="block text-sm font-medium mb-1">
          Position Title
        </label>
        <input
          id="position-title"
          type="text"
          value={formData.positionTitle}
          onChange={(e) => setFormData(prev => ({ ...prev, positionTitle: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          Company
        </label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-1">
          Application Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label htmlFor="application-date" className="block text-sm font-medium mb-1">
          Application Date
        </label>
        <input
          id="application-date"
          type="date"
          value={formData.applicationDate}
          onChange={(e) => setFormData(prev => ({ ...prev, applicationDate: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        Track Application
      </Button>
    </form>
  );
};

export default ApplicationForm;
