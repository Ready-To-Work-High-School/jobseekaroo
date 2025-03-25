
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, MessageSquare, Ticket, Users, BarChart } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useFadeIn } from '@/utils/animations';

const AdminPanel: React.FC = () => {
  const fadeIn = useFadeIn(300);

  return (
    <ProtectedRoute adminOnly>
      <Layout>
        <div className={`container max-w-5xl mx-auto py-8 px-4 ${fadeIn}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your platform's settings and data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" />
                  Redemption Codes
                </CardTitle>
                <CardDescription>
                  Manage and generate redemption codes for users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  Create, view, and manage access codes for students, employers, and other user types.
                </p>
                <Button asChild>
                  <Link to="/admin/redemption-codes">
                    Manage Redemption Codes
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Message Moderation
                </CardTitle>
                <CardDescription>
                  Review and approve user messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  Moderate messages between users to ensure platform safety and content quality.
                </p>
                <Button asChild>
                  <Link to="/admin/message-moderation">
                    Go to Message Moderation
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  View user profiles, change user types, and manage account access.
                </p>
                <Button asChild>
                  <Link to="/admin/user-management">
                    Manage Users
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Analytics
                </CardTitle>
                <CardDescription>
                  Platform usage and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  View detailed analytics on user engagement, redemption code usage, and more.
                </p>
                <Button disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminPanel;
