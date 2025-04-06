
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BadgeAwardForm from '@/components/admin/BadgeAwardForm';
import { Award, Info } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const EmployerBadges = () => {
  return (
    <ProtectedRoute requiredRoles={['employer', 'admin']}>
      <Layout>
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Student Badge Recognition</h1>
          <p className="text-muted-foreground mb-8">
            Award badges to students to recognize their skills and character traits
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <BadgeAwardForm />
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    About Badge Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Badges are a powerful way to recognize student skills and 
                    character traits that matter in the workplace.
                  </p>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Available Badges</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Reliable</span>
                          <p className="text-xs text-muted-foreground">Consistently delivers quality work on time</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Punctual</span>
                          <p className="text-xs text-muted-foreground">Always on time for shifts or meetings</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Team Player</span>
                          <p className="text-xs text-muted-foreground">Works well with others and contributes to team success</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Creative</span>
                          <p className="text-xs text-muted-foreground">Brings innovative ideas and solutions to challenges</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">How It Works</h3>
                    <ol className="list-decimal ml-4 space-y-2 text-sm">
                      <li>Select a student from your work programs</li>
                      <li>Choose a badge that reflects their strengths</li>
                      <li>Add a personal endorsement explaining why</li>
                      <li>The badge appears on their profile for employers to see</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployerBadges;
