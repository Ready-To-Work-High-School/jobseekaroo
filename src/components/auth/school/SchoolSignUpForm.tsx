
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, GraduationCap } from 'lucide-react';

interface SchoolSignUpFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: 'student' | 'employer';
    grade?: string;
  }) => void;
  isLoading: boolean;
}

const SchoolSignUpForm = ({ onSubmit, isLoading }: SchoolSignUpFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student' as 'student' | 'employer',
    grade: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-email">School Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="your.name@school.edu"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>

      <div>
        <Label>I am a:</Label>
        <Select 
          value={formData.userType} 
          onValueChange={(value: 'student' | 'employer') => setFormData({...formData, userType: value})}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student
              </div>
            </SelectItem>
            <SelectItem value="employer">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                School Staff/Employer
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.userType === 'student' && (
        <div>
          <Label htmlFor="grade">Grade Level</Label>
          <Select onValueChange={(value) => setFormData({...formData, grade: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select your grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">9th Grade</SelectItem>
              <SelectItem value="10">10th Grade</SelectItem>
              <SelectItem value="11">11th Grade</SelectItem>
              <SelectItem value="12">12th Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600" 
        disabled={isLoading}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        {isLoading ? 'Creating Account...' : 'Create School Account'}
      </Button>
    </form>
  );
};

export default SchoolSignUpForm;
