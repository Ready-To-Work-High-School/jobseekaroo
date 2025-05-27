
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

interface SchoolSignInFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}

const SchoolSignInForm = ({ onSubmit, isLoading }: SchoolSignInFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="signin-email">School Email</Label>
        <Input
          id="signin-email"
          type="email"
          placeholder="your.name@school.edu"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600" 
        disabled={isLoading}
      >
        <LogIn className="h-4 w-4 mr-2" />
        {isLoading ? 'Signing In...' : 'Sign In to School Portal'}
      </Button>
    </form>
  );
};

export default SchoolSignInForm;
