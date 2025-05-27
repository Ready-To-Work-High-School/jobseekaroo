
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Download, 
  Filter, 
  Calendar,
  Shield,
  GraduationCap,
  Briefcase,
  User as UserIcon
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface UserRepositoryData {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  user_type?: 'student' | 'employer' | 'admin' | 'teacher';
  created_at: string;
  redeemed_at?: string;
  redeemed_code?: string;
  location?: string;
  company_name?: string;
  job_title?: string;
  avatar_url?: string;
  verification_status?: string;
}

const UserRepository = () => {
  const [users, setUsers] = useState<UserRepositoryData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserRepositoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const { toast } = useToast();

  const userTypeIcons = {
    student: GraduationCap,
    employer: Briefcase,
    admin: Shield,
    teacher: UserIcon
  };

  const userTypeColors = {
    student: 'bg-blue-100 text-blue-800',
    employer: 'bg-green-100 text-green-800',
    admin: 'bg-red-100 text-red-800',
    teacher: 'bg-purple-100 text-purple-800'
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, searchTerm, filterType, filterVerification]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedUsers = data?.map(user => user as unknown as UserRepositoryData) || [];
      setUsers(typedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.company_name?.toLowerCase().includes(searchLower) ||
        user.location?.toLowerCase().includes(searchLower)
      );
    }

    // User type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(user => user.user_type === filterType);
    }

    // Verification filter
    if (filterVerification !== 'all') {
      if (filterVerification === 'verified') {
        filtered = filtered.filter(user => user.redeemed_at);
      } else if (filterVerification === 'unverified') {
        filtered = filtered.filter(user => !user.redeemed_at);
      }
    }

    setFilteredUsers(filtered);
  };

  const exportToCSV = () => {
    const csvHeaders = [
      'ID',
      'First Name',
      'Last Name', 
      'Email',
      'User Type',
      'Registration Date',
      'Verification Status',
      'Location',
      'Company',
      'Job Title'
    ];

    const csvData = filteredUsers.map(user => [
      user.id,
      user.first_name || '',
      user.last_name || '',
      user.email || '',
      user.user_type || '',
      new Date(user.created_at).toLocaleDateString(),
      user.redeemed_at ? 'Verified' : 'Unverified',
      user.location || '',
      user.company_name || '',
      user.job_title || ''
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `user_repository_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const renderUserAvatar = (user: UserRepositoryData) => {
    const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`;
    
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar_url || `https://avatar.vercel.sh/${user.email}.png`} />
        <AvatarFallback>{initials || <UserIcon size={16} />}</AvatarFallback>
      </Avatar>
    );
  };

  const renderUserTypeBadge = (userType?: string) => {
    if (!userType) return <Badge variant="secondary">Unknown</Badge>;
    
    const Icon = userTypeIcons[userType as keyof typeof userTypeIcons] || UserIcon;
    const colorClass = userTypeColors[userType as keyof typeof userTypeColors] || 'bg-gray-100 text-gray-800';
    
    return (
      <Badge className={`${colorClass} flex items-center gap-1`}>
        <Icon size={12} />
        {userType.charAt(0).toUpperCase() + userType.slice(1)}
      </Badge>
    );
  };

  const stats = {
    total: filteredUsers.length,
    students: filteredUsers.filter(u => u.user_type === 'student').length,
    employers: filteredUsers.filter(u => u.user_type === 'employer').length,
    admins: filteredUsers.filter(u => u.user_type === 'admin').length,
    teachers: filteredUsers.filter(u => u.user_type === 'teacher').length,
    verified: filteredUsers.filter(u => u.redeemed_at).length,
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">User Repository</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.students}</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.employers}</div>
              <div className="text-sm text-muted-foreground">Employers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
              <div className="text-sm text-muted-foreground">Admins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.teachers}</div>
              <div className="text-sm text-muted-foreground">Teachers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{stats.verified}</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="employer">Employers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterVerification} onValueChange={setFilterVerification}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Repository ({filteredUsers.length} users)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Company/Role</TableHead>
                      <TableHead>Last Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {renderUserAvatar(user)}
                            <div>
                              <div className="font-medium">
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ID: {user.id.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {renderUserTypeBadge(user.user_type)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm">
                                {new Date(user.created_at).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.redeemed_at ? (
                            <Badge className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              Unverified
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {user.location || 'Not specified'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {user.company_name && (
                              <div className="font-medium">{user.company_name}</div>
                            )}
                            {user.job_title && (
                              <div className="text-muted-foreground">{user.job_title}</div>
                            )}
                            {!user.company_name && !user.job_title && (
                              <span className="text-muted-foreground">Not specified</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {user.redeemed_at ? 
                              formatDistanceToNow(new Date(user.redeemed_at), { addSuffix: true }) :
                              'Never'
                            }
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {!isLoading && filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No users found matching the current filters.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserRepository;
