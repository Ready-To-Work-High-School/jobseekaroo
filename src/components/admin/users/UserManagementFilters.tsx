
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface UserManagementFiltersProps {
  onFilterChange: (filters: {
    userType: string;
    searchTerm: string;
    hasRedeemed: boolean | null;
  }) => void;
}

const UserManagementFilters: React.FC<UserManagementFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    userType: 'all',
    searchTerm: '',
    hasRedeemed: null as boolean | null,
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  useEffect(() => {
    // Initialize filters
    onFilterChange(filters);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <Label htmlFor="search" className="text-xs font-medium mb-1.5 block">
          Search User
        </Label>
        <Input 
          id="search"
          type="text" 
          placeholder="Search by name..." 
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          className="h-9"
        />
      </div>
      
      <div>
        <Label htmlFor="userType" className="text-xs font-medium mb-1.5 block">
          User Type
        </Label>
        <Select 
          value={filters.userType} 
          onValueChange={(value) => handleFilterChange('userType', value)}
        >
          <SelectTrigger id="userType" className="h-9">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="employer">Employers</SelectItem>
            <SelectItem value="teacher">Teachers</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-xs font-medium mb-1.5 block">
          Code Redemption
        </Label>
        <RadioGroup 
          value={filters.hasRedeemed === null ? 'all' : filters.hasRedeemed ? 'redeemed' : 'not-redeemed'}
          onValueChange={(value) => {
            let hasRedeemed = null;
            if (value === 'redeemed') hasRedeemed = true;
            if (value === 'not-redeemed') hasRedeemed = false;
            handleFilterChange('hasRedeemed', hasRedeemed);
          }}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="text-sm">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="redeemed" id="redeemed" />
            <Label htmlFor="redeemed" className="text-sm">Redeemed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-redeemed" id="not-redeemed" />
            <Label htmlFor="not-redeemed" className="text-sm">Not Redeemed</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default UserManagementFilters;
