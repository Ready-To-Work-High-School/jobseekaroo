
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Users, Briefcase } from 'lucide-react';

interface AuthSignUpTabProps {
  onSignUp: (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'employer') => Promise<void>;
  error: string;
  isLoading: boolean;
}

const AuthSignUpTab = ({ onSignUp, error, isLoading }: AuthSignUpTabProps) => {
  const [signUpData, setSignUpData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    userType: 'student' as 'student' | 'employer' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignUp(signUpData.email, signUpData.password, signUpData.firstName, signUpData.lastName, signUpData.userType);
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={signUpData.firstName}
              onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={signUpData.lastName}
              onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="signup-email">Email address</Label>
          <Input
            id="signup-email"
            type="email"
            value={signUpData.email}
            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            value={signUpData.password}
            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label>Account Type</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="student"
                checked={signUpData.userType === 'student'}
                onChange={(e) => setSignUpData({...signUpData, userType: 'student'})}
              />
              <Users className="h-4 w-4" />
              Student
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="employer"
                checked={signUpData.userType === 'employer'}
                onChange={(e) => setSignUpData({...signUpData, userType: 'employer'})}
              />
              <Briefcase className="h-4 w-4" />
              Employer
            </label>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          <UserPlus className="h-4 w-4 mr-2" />
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </>
  );
};

export default AuthSignUpTab;
