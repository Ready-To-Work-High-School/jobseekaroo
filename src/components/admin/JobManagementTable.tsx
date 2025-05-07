
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Download, FileSpreadsheet, Clock, ArrowUpDown, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/types/job';
import { useToast } from '@/hooks/use-toast';

interface JobManagementTableProps {
  jobs: Job[];
  isLoading: boolean;
  onRefresh?: () => void;
}

const JobManagementTable: React.FC<JobManagementTableProps> = ({ 
  jobs,
  isLoading,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'company' | 'title'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();
  
  const handleSort = (column: 'date' | 'company' | 'title') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.postedDate).getTime();
      const dateB = new Date(b.postedDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'company') {
      return sortDirection === 'asc' 
        ? a.company.name.localeCompare(b.company.name)
        : b.company.name.localeCompare(a.company.name);
    } else {
      return sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });
  
  const exportToCSV = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "ID,Title,Company,Location,Type,Experience Level,Pay Rate,Posted Date,Remote,Featured\n";
    
    // Add data rows
    filteredJobs.forEach(job => {
      const row = [
        job.id,
        `"${job.title.replace(/"/g, '""')}"`,
        `"${job.company.name.replace(/"/g, '""')}"`,
        `"${job.location.city}, ${job.location.state}"`,
        job.type,
        job.experienceLevel,
        `$${job.payRate.min}-$${job.payRate.max}/${job.payRate.period}`,
        job.postedDate,
        job.isRemote ? 'Yes' : 'No',
        job.isFeatured ? 'Yes' : 'No'
      ].join(',');
      csvContent += row + "\n";
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "jobs_export.csv");
    document.body.appendChild(link);
    
    // Download file
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: `Exported ${filteredJobs.length} jobs to CSV file`,
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Job Catalog</CardTitle>
        <CardDescription>
          View and manage all jobs in the system
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or location..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh list"
            >
              <Clock className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" title="Export data">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export to CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : sortedJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center">
                      Job Title
                      {sortBy === 'title' && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('company')}
                  >
                    <div className="flex items-center">
                      Company
                      {sortBy === 'company' && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Posted
                      {sortBy === 'date' && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.company.name}</TableCell>
                    <TableCell>{job.location.city}, {job.location.state}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {job.isFeatured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                        {job.isRemote && (
                          <Badge variant="outline">Remote</Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            {searchTerm ? 'No jobs found matching your search.' : 'No jobs found in the system.'}
          </div>
        )}
        
        <div className="mt-4 text-muted-foreground text-sm">
          Total: {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobManagementTable;
