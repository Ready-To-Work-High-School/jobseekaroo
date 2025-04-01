
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RedemptionCodeManager from "@/components/admin/RedemptionCodeManager";
import EncryptionServiceTest from "@/components/EncryptionServiceTest";
import EmployerVerification from "@/components/admin/EmployerVerification";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Mail,
  MessageSquare,
  KeyRound,
  Shield,
  Briefcase,
  FileCheck
} from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("encryption");
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  // Add debug log to trace page rendering
  console.log('AdminPanel page rendered, userProfile:', userProfile);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">User Management</CardTitle>
            <CardDescription>Manage platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate("/admin/users")}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Users className="h-4 w-4" /> Manage Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Communication</CardTitle>
            <CardDescription>Manage messages and emails</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => navigate("/admin/message-moderation")}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" /> Message Moderation
            </Button>
            <Button
              onClick={() => navigate("/admin/emails")}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> Email Templates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Integrations</CardTitle>
            <CardDescription>Manage external services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => setActiveTab("encryption")}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <KeyRound className="h-4 w-4" /> Encryption Test
            </Button>
            <Button
              onClick={() => setActiveTab("security")}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Shield className="h-4 w-4" /> Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 h-auto">
          <TabsTrigger value="redemption" className="flex gap-2 items-center">
            <Mail className="h-4 w-4" /> Redemption Codes
          </TabsTrigger>
          <TabsTrigger value="encryption" className="flex gap-2 items-center">
            <KeyRound className="h-4 w-4" /> Encryption Test
          </TabsTrigger>
          <TabsTrigger value="employers" className="flex gap-2 items-center">
            <Briefcase className="h-4 w-4" /> Employer Verification
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex gap-2 items-center">
            <FileCheck className="h-4 w-4" /> Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="redemption" className="space-y-4">
          <RedemptionCodeManager />
        </TabsContent>

        <TabsContent value="encryption" className="space-y-4">
          <div className="max-w-2xl mx-auto">
            <EncryptionServiceTest />
          </div>
        </TabsContent>
        
        <TabsContent value="employers" className="space-y-4">
          <EmployerVerification />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security settings for the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Access Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Row Level Security (RLS) is enabled on all database tables to ensure users can only access their own data.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Data Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    Sensitive data such as resumes and contact information is encrypted using AES-256-GCM.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">API Security</h3>
                  <p className="text-sm text-muted-foreground">
                    All API endpoints use JWT authentication and implement rate limiting and DDoS protection.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">File Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Files are served using time-limited signed URLs to prevent unauthorized access.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Audit Logs
              </CardTitle>
              <CardDescription>
                View and analyze security audit logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The audit log dashboard will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
