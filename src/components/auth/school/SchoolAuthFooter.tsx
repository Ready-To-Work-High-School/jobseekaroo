
import { School } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';

const SchoolAuthFooter = () => {
  return (
    <CardFooter className="flex flex-col space-y-2 text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <School className="h-4 w-4" />
        <span>Secure • School-Verified • Safe</span>
      </div>
      <p className="text-xs text-gray-500">
        By signing up, you agree to follow school policies and guidelines
      </p>
    </CardFooter>
  );
};

export default SchoolAuthFooter;
