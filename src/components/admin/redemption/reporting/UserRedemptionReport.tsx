
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RedemptionCode } from '@/types/redemption';
import { CalendarIcon, Download, Search, UserIcon } from 'lucide-react';
import { useBulkExport } from '@/hooks/redemption/useBulkExport';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface UserRedemptionReportProps {
  codes: RedemptionCode[];
  formatDate: (date?: Date | string) => string;
}

const UserRedemptionReport: React.FC<UserRedemptionReportProps> = ({ codes, formatDate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState<string>('');
  const [reportType, setReportType] = useState<'usage' | 'distribution'>('usage');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const { exportCodes } = useBulkExport();

  // Get unique users
  const uniqueUsers = Array.from(new Set(codes.filter(code => code.usedBy).map(code => code.usedBy)));

  // Filter codes
  const filteredCodes = codes.filter(code => {
    let matches = true;
    
    // Search term
    if (searchTerm) {
      matches = matches && (
        code.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (code.usedBy && code.usedBy.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // User filter
    if (userFilter) {
      matches = matches && code.usedBy === userFilter;
    }
    
    // Date range
    if (dateRange.from) {
      matches = matches && code.usedAt ? new Date(code.usedAt) >= dateRange.from : false;
    }
    
    if (dateRange.to) {
      matches = matches && code.usedAt ? new Date(code.usedAt) <= dateRange.to : false;
    }
    
    return matches;
  });

  // Usage metrics
  const totalUsed = filteredCodes.filter(code => code.used).length;
  const studentCodesUsed = filteredCodes.filter(code => code.used && code.type === 'student').length;
  const employerCodesUsed = filteredCodes.filter(code => code.used && code.type === 'employer').length;

  // Usage by user
  const usageByUser = uniqueUsers.map(userId => {
    const userCodes = filteredCodes.filter(code => code.usedBy === userId);
    return {
      userId,
      totalCodes: userCodes.length,
      studentCodes: userCodes.filter(code => code.type === 'student').length,
      employerCodes: userCodes.filter(code => code.type === 'employer').length
    };
  });

  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    if (format === 'csv') {
      await exportCodes(filteredCodes, 'csv');
    } else if (format === 'excel') {
      await exportCodes(filteredCodes, 'csv'); // CSV works for Excel too
    } else {
      // Print for PDF
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Redemption Report</h2>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="flex flex-col space-y-1">
                <Button variant="ghost" size="sm" onClick={() => handleExport('csv')}>
                  CSV
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleExport('excel')}>
                  Excel
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleExport('pdf')}>
                  PDF
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Redemption Code Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search codes or users"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user">User</Label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Users</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={(value: 'usage' | 'distribution') => setReportType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usage">Usage Report</SelectItem>
                  <SelectItem value="distribution">Distribution Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {reportType === 'usage' ? 'Code Usage Metrics' : 'Code Distribution by User'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reportType === 'usage' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{totalUsed}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Codes Used</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{studentCodesUsed}</div>
                    <div className="text-sm text-muted-foreground mt-1">Student Codes Used</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{employerCodesUsed}</div>
                    <div className="text-sm text-muted-foreground mt-1">Employer Codes Used</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Total Codes</TableHead>
                  <TableHead>Student Codes</TableHead>
                  <TableHead>Employer Codes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageByUser.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        {user.userId}
                      </div>
                    </TableCell>
                    <TableCell>{user.totalCodes}</TableCell>
                    <TableCell>{user.studentCodes}</TableCell>
                    <TableCell>{user.employerCodes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Code Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Used By</TableHead>
                <TableHead>Used Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.filter(code => code.used).map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-medium">{code.code}</TableCell>
                  <TableCell>
                    <span className={code.type === 'student' ? 'text-blue-600' : 'text-pink-600'}>
                      {code.type}
                    </span>
                  </TableCell>
                  <TableCell>{code.usedBy || 'N/A'}</TableCell>
                  <TableCell>{code.usedAt ? formatDate(code.usedAt) : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRedemptionReport;
