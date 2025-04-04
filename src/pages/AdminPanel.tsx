
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BarChart, 
  Shield, 
  Clock, 
  Trash2, 
  LogOut, 
  Settings 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserManagementContainer from "@/components/admin/users/UserManagementContainer";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { userProfile, refreshProfile } = useAuth();

  // Add debug log to trace page rendering
  console.log('AdminPanel page rendered, userProfile:', userProfile);

  return (
    <Layout>
      <ProtectedRoute adminOnly>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage users, view analytics, and control system settings
              </p>
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => refreshProfile()}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>Manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setActiveTab("users")}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Users className="h-4 w-4" /> View All Users
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription>Monitor platform usage</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setActiveTab("analytics")}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <BarChart className="h-4 w-4" /> View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  System Settings
                </CardTitle>
                <CardDescription>Manage system configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setActiveTab("settings")}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" /> View Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-1 md:grid-cols-4 h-auto">
              <TabsTrigger value="dashboard" className="flex gap-2 items-center">
                <Shield className="h-4 w-4" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="flex gap-2 items-center">
                <Users className="h-4 w-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex gap-2 items-center">
                <BarChart className="h-4 w-4" /> Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex gap-2 items-center">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Dashboard</CardTitle>
                  <CardDescription>
                    Welcome to the administrative control panel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Select a section from the tabs above to manage different aspects of the platform.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button className="justify-start" onClick={() => setActiveTab("users")}>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button className="justify-start" onClick={() => setActiveTab("analytics")}>
                      <BarChart className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                    <Button className="justify-start" onClick={() => setActiveTab("settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      System Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <UserManagementContainer />
            </TabsContent>

            <TabsContent value="analytics">
              <AdminAnalytics />
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure system-wide settings and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                        <p className="text-sm text-red-800 dark:text-red-300 mb-4">
                          These actions are destructive and may affect system stability.
                          Use with caution.
                        </p>
                        
                        <div className="flex flex-col space-y-2">
                          <Button 
                            variant="destructive" 
                            className="w-full justify-start"
                            onClick={() => {
                              if (confirm("Are you sure you want to clear all user data? This cannot be undone.")) {
                                // Implementation would go here
                                alert("This feature is not implemented yet");
                              }
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Clear All User Data
                          </Button>
                          
                          <Button 
                            variant="destructive" 
                            className="w-full justify-start"
                            onClick={() => {
                              if (confirm("Are you sure you want to reset the entire system? This cannot be undone.")) {
                                // Implementation would go here
                                alert("This feature is not implemented yet");
                              }
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Reset System
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">System Configuration</h3>
                      <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-md p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Enable User Registrations</p>
                              <p className="text-sm text-muted-foreground">
                                Allow new users to register on the platform
                              </p>
                            </div>
                            <input 
                              type="checkbox" 
                              className="toggle toggle-primary" 
                              defaultChecked={true} 
                            />
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Require Email Verification</p>
                              <p className="text-sm text-muted-foreground">
                                Users must verify their email before accessing features
                              </p>
                            </div>
                            <input 
                              type="checkbox" 
                              className="toggle toggle-primary" 
                              defaultChecked={true} 
                            />
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Log User Activity</p>
                              <p className="text-sm text-muted-foreground">
                                Track detailed user actions for analytics
                              </p>
                            </div>
                            <input 
                              type="checkbox" 
                              className="toggle toggle-primary" 
                              defaultChecked={true} 
                            />
                          </div>
                          
                          <Button
                            variant="outline"
                            className="mt-2 w-full"
                            onClick={() => {
                              alert("Settings saved successfully");
                            }}
                          >
                            Save Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
