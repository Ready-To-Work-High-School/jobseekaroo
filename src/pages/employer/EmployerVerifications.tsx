
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function EmployerVerifications() {
  const { data: verifications, isLoading, error } = useQuery({
    queryKey: ['employer-verifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_verifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleStatusUpdate = async (id: string, status: 'approved' | 'denied') => {
    try {
      const { error } = await supabase
        .from('employer_verifications')
        .update({ 
          status,
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Employer verification ${status}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-6">
          <Card className="p-6">
            <p className="text-red-500">Error loading verifications</p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Employer Verifications</h1>
        
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </Card>
            ))
          ) : verifications?.map((verification) => (
            <Card key={verification.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{verification.company_name}</h2>
                  <p className="text-muted-foreground">EIN: {verification.ein}</p>
                  <p>{verification.contact_name} - {verification.contact_email}</p>
                  <p className="mt-2">{verification.address}</p>
                  
                  <div className="mt-4">
                    <h3 className="font-medium">Job Details</h3>
                    <p>{verification.job_description}</p>
                    <p className="mt-2">
                      Wage Range: ${verification.wage_range_min} - ${verification.wage_range_max} | 
                      Hours: {verification.hours_per_week}/week
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge
                    variant={
                      verification.status === 'approved' ? 'success' :
                      verification.status === 'denied' ? 'destructive' : 'default'
                    }
                    className="mb-4"
                  >
                    {verification.status === 'approved' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {verification.status === 'denied' && <XCircle className="w-4 h-4 mr-1" />}
                    {verification.status === 'pending' && <Clock className="w-4 h-4 mr-1" />}
                    {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                  </Badge>

                  {verification.status === 'pending' && (
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-50"
                        onClick={() => handleStatusUpdate(verification.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleStatusUpdate(verification.id, 'denied')}
                      >
                        Deny
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
