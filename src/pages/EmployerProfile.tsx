
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Mail, Globe, Phone, MapPin, Briefcase, Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const EmployerProfile = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) return;
    
    const fetchCompanyProfile = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
          console.error('Error fetching company profile:', error);
          toast({
            title: "Error",
            description: "Failed to load company profile",
            variant: "destructive",
          });
        } else if (data) {
          setCompanyProfile(data);
        }
      } catch (error) {
        console.error('Exception:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyProfile();
  }, [user, toast]);

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-10 text-center">
            <p>Please sign in to view your employer profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Employer Profile</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Company Overview</TabsTrigger>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage your company profile information visible to students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : companyProfile ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    {companyProfile.logo_url ? (
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={companyProfile.logo_url} alt={companyProfile.company_name} />
                        <AvatarFallback>{companyProfile.company_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-24 w-24 rounded-md bg-muted flex items-center justify-center">
                        <Building2 className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold">{companyProfile.company_name}</h2>
                      <div className="flex items-center mt-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{userProfile?.location || "No location specified"}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={companyProfile.website_url} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline">
                          {companyProfile.website_url}
                        </a>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          {companyProfile.industry} · {companyProfile.company_size} employees
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                      <a href="/employer/dashboard">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Profile
                      </a>
                    </Button>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">About</h3>
                    <p className="text-muted-foreground">
                      {companyProfile.description || "No company description available."}
                    </p>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Company Culture</h3>
                    <p className="text-muted-foreground">
                      {companyProfile.culture_description || "No culture description available."}
                    </p>
                  </div>
                  
                  {companyProfile.benefits && companyProfile.benefits.length > 0 && (
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">Benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {companyProfile.benefits.map((benefit: string, index: number) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-medium text-lg">No company profile set up yet</h3>
                    <p className="text-muted-foreground">
                      Create your company profile to showcase your brand to students
                    </p>
                    <Button className="mt-4" asChild>
                      <a href="/employer/dashboard">
                        Set Up Company Profile
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Your Job Postings</CardTitle>
              <CardDescription>
                Manage your active and archived job listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="font-medium text-lg mt-4">Job listings will be shown here</h3>
                <p className="text-muted-foreground">
                  Go to your dashboard to create and manage job postings
                </p>
                <Button className="mt-4" asChild>
                  <a href="/employer-dashboard">
                    Employer Dashboard
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                View analytics for your job postings and candidate interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p>Performance metrics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerProfile;
