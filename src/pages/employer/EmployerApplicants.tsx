
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EmployerApplicants = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8" />
              View Applicants
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and review candidates who have applied to your job postings
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <Input 
                    placeholder="Search applicants by name, skills, or job title..." 
                    className="w-full"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
                <h3 className="mt-4 text-lg font-medium">No applicants yet</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  When candidates apply to your job postings, they'll appear here for you to review and manage.
                </p>
                <Button className="mt-4" asChild>
                  <a href="/employer-dashboard">Post Your First Job</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerApplicants;
