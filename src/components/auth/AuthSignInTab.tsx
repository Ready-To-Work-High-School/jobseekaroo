
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

interface AuthSignInTabProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  error: string;
  isLoading: boolean;
}

const AuthSignInTab = ({ onSignIn, error, isLoading }: AuthSignInTabProps) => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignIn(signInData.email, signInData.password);
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="signin-email">Email address</Label>
          <Input
            id="signin-email"
            type="email"
            value={signInData.email}
            onChange={(e) => setSignInData({...signInData, email: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="signin-password">Password</Label>
          <Input
            id="signin-password"
            type="password"
            value={signInData.password}
            onChange={(e) => setSignInData({...signInData, password: e.target.value})}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          <LogIn className="h-4 w-4 mr-2" />
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </>
  );
};

export default AuthSignInTab;
