
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface RedemptionCodeOptionsProps {
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const RedemptionCodeOptions: React.FC<RedemptionCodeOptionsProps> = ({
  codeType,
  setCodeType,
  expireDays,
  setExpireDays
}) => {
  const form = useForm({
    defaultValues: {
      codeType,
      expireDays
    }
  });

  // Update parent state when form values change
  const handleCodeTypeChange = (value: 'student' | 'employer') => {
    setCodeType(value);
  };

  const handleExpireDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value) || 30;
    setExpireDays(days);
  };

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-md flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Code Generation Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="codeType"
              render={() => (
                <FormItem>
                  <FormLabel>Code Type</FormLabel>
                  <FormControl>
                    <Select 
                      value={codeType} 
                      onValueChange={handleCodeTypeChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Code Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expireDays"
              render={() => (
                <FormItem>
                  <FormLabel>Expiration (Days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={expireDays}
                      onChange={handleExpireDaysChange}
                      min={1}
                      max={365}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RedemptionCodeOptions;
