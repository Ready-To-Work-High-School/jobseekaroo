
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UsersTabProps {
  users: any[];
  isLoading: boolean;
}

const UsersTab: React.FC<UsersTabProps> = ({ users, isLoading }) => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage all users in the system</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id || index} className="border-t">
                    <td className="px-4 py-2">{user.id || index + 1}</td>
                    <td className="px-4 py-2">{user.username || 'N/A'}</td>
                    <td className="px-4 py-2">{user.email || 'N/A'}</td>
                    <td className="px-4 py-2">
                      <button 
                        className="mr-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                        onClick={() => toast({ title: "Feature Coming Soon", description: "Edit functionality is under development." })}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        onClick={() => toast({ title: "Feature Coming Soon", description: "Delete functionality is under development." })}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-10 text-gray-500">No users found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersTab;
