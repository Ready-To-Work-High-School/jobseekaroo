
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const Admin = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="outline" asChild className="h-auto p-6 text-left">
            <Link to="/admin/dashboard">
              <div className="text-lg font-medium">Dashboard</div>
              <div className="text-sm text-muted-foreground mt-1">View platform metrics and analytics</div>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto p-6 text-left">
            <Link to="/admin/users">
              <div className="text-lg font-medium">User Management</div>
              <div className="text-sm text-muted-foreground mt-1">Manage platform users</div>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto p-6 text-left">
            <Link to="/admin/redemption">
              <div className="text-lg font-medium">Redemption Codes</div>
              <div className="text-sm text-muted-foreground mt-1">Manage redemption codes</div>
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
