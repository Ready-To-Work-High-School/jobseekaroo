import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Stethoscope, ArrowLeft, Activity, Users, CheckCircle } from 'lucide-react';
import HealthcareAssistantDemo from '@/components/healthcare/HealthcareAssistantDemo';

const HealthcareSimulation = () => {
  const fadeIn = useFadeIn(300);
  const navigate = useNavigate();

  // Function to handle tab navigation
  const navigateToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`);
    if (tabElement && tabElement instanceof HTMLElement) {
      tabElement.click();
    }
  };

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        {/* Navigation */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/job-simulations')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Simulations
          </Button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Healthcare Assistant Simulation</h1>
            <div className="flex gap-2">
              <Badge variant="outline" className="capitalize">Healthcare</Badge>
              <Badge variant="secondary">
                2-3 Hours
              </Badge>
              <Badge variant="outline">
                Intermediate
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">
            Experience the role of a healthcare assistant providing patient support and information
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demonstration">Live Demo</TabsTrigger>
            <TabsTrigger value="tasks">Your Tasks</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Healthcare Assistant Simulation</CardTitle>
                    <CardDescription>
                      Learn to provide patient support in a healthcare setting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      In this simulation, you'll step into the role of a healthcare assistant
                      providing information, guidance, and support to patients. You'll learn how to 
                      respond to patient inquiries, schedule appointments, and provide general healthcare
                      information while maintaining professionalism and empathy.
                    </p>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">What You'll Learn:</h3>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Healthcare communication protocols and best practices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Patient data management and privacy regulations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Appointment scheduling and management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>How to handle common patient inquiries and concerns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Digital health tool usage in modern healthcare settings</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Skills You'll Gain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Patient Communication
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Data Privacy
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Administrative Skills
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Healthcare Terminology
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Digital Health Tools
                      </Badge>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-rose-500" />
                        <div>
                          <h3 className="font-medium">Healthcare Industry Exposure</h3>
                          <p className="text-sm text-muted-foreground">
                            Gain real-world experience in a growing field
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">Patient Interaction</h3>
                          <p className="text-sm text-muted-foreground">
                            Practice professional healthcare communication
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        <div>
                          <h3 className="font-medium">Empathy Training</h3>
                          <p className="text-sm text-muted-foreground">
                            Develop compassionate patient care skills
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Simulation</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Demonstration Tab */}
          <TabsContent value="demonstration" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Stethoscope className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Live Healthcare Assistant Demo</CardTitle>
                      <CardDescription>
                        Try interacting with our virtual healthcare assistant to see how it works
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <HealthcareAssistantDemo />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => navigateToTab("tasks")}>
                    Continue to Tasks
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Task 1: Initial Patient Support</CardTitle>
                <CardDescription>
                  Respond to patient inquiries with appropriate information and empathy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  In this task, you'll practice responding to common patient inquiries in a healthcare setting. 
                  You need to demonstrate both clinical knowledge and empathetic communication.
                </p>
                
                <div className="border rounded-md p-4 bg-slate-50 mb-6">
                  <h3 className="font-medium mb-2">Scenario:</h3>
                  <p>
                    A patient calls asking about their recent lab results that were supposed to be 
                    ready today. They sound anxious and mention they've been waiting for these important results. 
                    The system shows their results aren't in the system yet.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">How would you respond to this patient?</h3>
                  <textarea
                    className="w-full h-32 p-3 border rounded-md"
                    placeholder="Type your response here..."
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Submit & Continue
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HealthcareSimulation;
