
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserDataTable from './UserDataTable';
import { useAdminUserManagement } from '@/hooks/admin/useAdminUserManagement';

const UserManagementContainer = () => {
  // Use the admin-specific hook instead
  const { 
    users, 
    loading, 
    error,
    fetchUsers, 
    updateUserType,
    deleteUser,
  } = useAdminUserManagement();

  useEffect(() => {
    fetchUsers();
  }, []);

  const studentUsers = users.filter(user => user.user_type === 'student');
  const employerUsers = users.filter(user => user.user_type === 'employer');
  const adminUsers = users.filter(user => user.user_type === 'admin');
  const teacherUsers = users.filter(user => user.user_type === 'teacher');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="employers">Employers</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <UserDataTable 
              users={users} 
              loading={loading} 
              onUpdateUserType={updateUserType}
              onDeleteUser={deleteUser}
            />
          </TabsContent>
          
          <TabsContent value="students">
            <UserDataTable 
              users={studentUsers} 
              loading={loading} 
              onUpdateUserType={updateUserType}
              onDeleteUser={deleteUser}
            />
          </TabsContent>
          
          <TabsContent value="employers">
            <UserDataTable 
              users={employerUsers} 
              loading={loading} 
              onUpdateUserType={updateUserType}
              onDeleteUser={deleteUser}
            />
          </TabsContent>
          
          <TabsContent value="admins">
            <UserDataTable 
              users={adminUsers} 
              loading={loading} 
              onUpdateUserType={updateUserType}
              onDeleteUser={deleteUser}
            />
          </TabsContent>

          <TabsContent value="teachers">
            <UserDataTable 
              users={teacherUsers} 
              loading={loading} 
              onUpdateUserType={updateUserType}
              onDeleteUser={deleteUser}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserManagementContainer;
