
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import UserManagementFilters from './UserManagementFilters';
import UserManagementTable from '@/components/admin/UserManagementTable';
import UserTypeStatistics from './UserTypeStatistics';
import UserDetailDialog from './UserDetailDialog';
import UserActionButtons from './UserActionButtons';
import { useUserManagement } from '@/hooks/useUserManagement';

const UserManagementContainer: React.FC = () => {
  const {
    users,
    isLoading,
    userStats,
    selectedUser,
    showUserDialog,
    fetchUsers,
    updateUserType,
    deleteUser,
    handleFilterChange,
    handleViewUserDetails,
    setShowUserDialog,
    exportUsers
  } = useUserManagement();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <UserTypeStatistics stats={userStats} className="lg:col-span-5" />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <UserManagementFilters onFilterChange={handleFilterChange} />
          
          <UserActionButtons
            isLoading={isLoading}
            onRefresh={fetchUsers}
            onExport={exportUsers}
            usersCount={users.length}
          />
        </div>

        <UserManagementTable 
          users={users}
          isLoading={isLoading}
          onViewDetails={handleViewUserDetails}
          onUpdateUserType={updateUserType}
          onDeleteUser={deleteUser}
        />
      </Card>

      {selectedUser && (
        <UserDetailDialog
          user={selectedUser}
          isOpen={showUserDialog}
          onClose={() => setShowUserDialog(false)}
          onUpdateUserType={updateUserType}
          onDeleteUser={deleteUser}
        />
      )}
    </div>
  );
};

export default UserManagementContainer;
