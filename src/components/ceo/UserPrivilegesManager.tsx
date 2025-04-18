
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Shield, 
  UserPlus, 
  X, 
  Check, 
  Crown, 
  Search, 
  Filter, 
  Building2, 
  GraduationCap
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// Mock user data
const mockUsers = [
  { 
    id: '1', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    user_type: 'admin',
    avatar_url: null,
    premium_status: 'active',
  },
  { 
    id: '2', 
    name: 'John Doe', 
    email: 'john@example.com', 
    user_type: 'student',
    avatar_url: null,
    premium_status: null,
  },
  { 
    id: '3', 
    name: 'Emma Johnson', 
    email: 'emma@company.com', 
    user_type: 'employer',
    avatar_url: null,
    premium_status: 'trial',
  },
  { 
    id: '4', 
    name: 'Michael Brown', 
    email: 'michael@school.edu', 
    user_type: 'teacher',
    avatar_url: null,
    premium_status: null,
  }
];

const UserPrivilegesManager = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    // Apply text search
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply type filter
    const matchesFilter = 
      filter === 'all' || 
      user.user_type === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleUserRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, user_type: newRole } 
        : user
    ));
    
    toast({
      title: "User role updated",
      description: `User role has been changed to ${newRole}`,
    });
  };

  const handlePremiumStatusChange = (userId: string, newStatus: string | null) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, premium_status: newStatus } 
        : user
    ));
    
    toast({
      title: "Premium status updated",
      description: `User premium status has been ${newStatus ? `changed to ${newStatus}` : 'removed'}`,
    });
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'employer': return <Building2 className="h-4 w-4" />;
      case 'teacher': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getUserTypeBadge = (type: string) => {
    let color = "bg-gray-100 text-gray-800";
    
    switch (type) {
      case 'admin': color = "bg-purple-100 text-purple-800"; break;
      case 'student': color = "bg-blue-100 text-blue-800"; break;
      case 'employer': color = "bg-amber-100 text-amber-800"; break;
      case 'teacher': color = "bg-green-100 text-green-800"; break;
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
        {getUserTypeIcon(type)}
        <span className="ml-1 capitalize">{type}</span>
      </span>
    );
  };

  const getPremiumBadge = (status: string | null) => {
    if (!status) return null;
    
    let color = "bg-gray-100 text-gray-800";
    let label = "Unknown";
    
    switch (status) {
      case 'active': 
        color = "bg-amber-100 text-amber-800"; 
        label = "Premium";
        break;
      case 'trial': 
        color = "bg-blue-100 text-blue-800"; 
        label = "Trial";
        break;
      case 'expired': 
        color = "bg-red-100 text-red-800"; 
        label = "Expired";
        break;
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
        <Sparkles className="h-3 w-3 mr-1" />
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            User Privileges Manager
          </CardTitle>
          <CardDescription>
            Grant or revoke user privileges, manage access levels and premium statuses
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="employer">Employers</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      {getUserTypeBadge(user.user_type)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {getPremiumBadge(user.premium_status)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {selectedUser && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center justify-between">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Edit User Privileges
              </span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedUser(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              Manage privileges for {selectedUser.name}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">User Role</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={selectedUser.user_type === 'student' ? 'default' : 'outline'} 
                    onClick={() => handleUserRoleChange(selectedUser.id, 'student')}
                    className="justify-start"
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Student
                  </Button>
                  <Button 
                    variant={selectedUser.user_type === 'employer' ? 'default' : 'outline'} 
                    onClick={() => handleUserRoleChange(selectedUser.id, 'employer')}
                    className="justify-start"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Employer
                  </Button>
                  <Button 
                    variant={selectedUser.user_type === 'teacher' ? 'default' : 'outline'} 
                    onClick={() => handleUserRoleChange(selectedUser.id, 'teacher')}
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Teacher
                  </Button>
                  <Button 
                    variant={selectedUser.user_type === 'admin' ? 'default' : 'outline'} 
                    onClick={() => handleUserRoleChange(selectedUser.id, 'admin')}
                    className="justify-start"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Premium Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={selectedUser.premium_status === 'active' ? 'default' : 'outline'} 
                    onClick={() => handlePremiumStatusChange(selectedUser.id, 'active')}
                    className="justify-start"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Premium
                  </Button>
                  <Button 
                    variant={selectedUser.premium_status === 'trial' ? 'default' : 'outline'} 
                    onClick={() => handlePremiumStatusChange(selectedUser.id, 'trial')}
                    className="justify-start"
                  >
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Free Trial
                  </Button>
                  <Button 
                    variant={selectedUser.premium_status === null ? 'default' : 'outline'} 
                    onClick={() => handlePremiumStatusChange(selectedUser.id, null)}
                    className="justify-start"
                  >
                    <X className="mr-2 h-4 w-4" />
                    No Premium
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Special Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ceo-toggle" className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-amber-500" />
                      CEO Privileges
                    </Label>
                    <Switch id="ceo-toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="moderator-toggle" className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      Content Moderation
                    </Label>
                    <Switch id="moderator-toggle" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>Cancel</Button>
                <Button onClick={() => {
                  toast({
                    title: "User privileges updated",
                    description: "All changes have been saved successfully",
                  });
                  setSelectedUser(null);
                }}>Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserPrivilegesManager;

// Add missing component imports
function CalendarClock(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <circle cx="17" cy="17" r="4" />
      <path d="M17 15v2l1 1" />
    </svg>
  );
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
    </svg>
  );
}
