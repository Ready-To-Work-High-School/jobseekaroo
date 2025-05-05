
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Users, PlusCircle, Search, School, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AccountTypeBadge from '@/components/layout/AccountTypeBadge';

const mockStudents = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@school.edu', grade: '12th', status: 'active' },
  { id: 2, name: 'Jamie Smith', email: 'jamie.s@school.edu', grade: '11th', status: 'active' },
  { id: 3, name: 'Taylor Wilson', email: 'taylor.w@school.edu', grade: '12th', status: 'pending' },
  { id: 4, name: 'Morgan Lee', email: 'morgan.l@school.edu', grade: '10th', status: 'active' },
  { id: 5, name: 'Casey Brown', email: 'casey.b@school.edu', grade: '11th', status: 'inactive' },
];

const SchoolStudents = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Required</h1>
          <p className="mb-8">Please sign in to access student management.</p>
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <School className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Student Management</h1>
              <p className="text-muted-foreground">Manage student accounts and track progress</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline">
              <Link to="/school-dashboard">
                Back to Dashboard
              </Link>
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Students Overview</CardTitle>
            <CardDescription>
              View and manage all students registered through your school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        <div className="flex flex-col items-center justify-center">
                          <GraduationCap className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            {searchQuery ? 'No students match your search' : 'No students found'}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>
                          <Badge className={`
                            ${student.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              student.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                              'bg-gray-100 text-gray-800 hover:bg-gray-100'}
                          `}>
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Student Credentials</CardTitle>
              <CardDescription>Manage access codes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Generate and distribute access codes for your students to sign up for the platform.
              </p>
              <Button className="w-full">Manage Credentials</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Progress Reports</CardTitle>
              <CardDescription>Track student achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View detailed reports on student job search progress and skill development.
              </p>
              <Button variant="outline" className="w-full">View Reports</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Group Management</CardTitle>
              <CardDescription>Organize students into groups</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create and manage groups of students for easier administration and reporting.
              </p>
              <Button variant="outline" className="w-full">Manage Groups</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolStudents;
