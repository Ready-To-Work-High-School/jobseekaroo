
import { School } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const SchoolAuthHeader = () => {
  return (
    <CardHeader className="text-center space-y-2">
      <div className="flex justify-center">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-full">
          <School className="h-8 w-8 text-white" />
        </div>
      </div>
      <CardTitle className="text-2xl font-bold text-gray-800">School Portal</CardTitle>
      <CardDescription className="text-gray-600">
        Access your school account to connect with opportunities
      </CardDescription>
    </CardHeader>
  );
};

export default SchoolAuthHeader;
