
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Plus, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateAdminRedemptionCode } from '@/lib/supabase/redemption/generateAdminCode';

const AdminCodeGenerator: React.FC = () => {
  const [expireDays, setExpireDays] = useState<number>(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateAdminCode = async () => {
    setIsGenerating(true);
    try {
      const code = await generateAdminRedemptionCode(expireDays);
      
      if (code) {
        setGeneratedCode(code.code);
        toast({
          title: 'Success',
          description: `Generated admin code: ${code.code}`,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to generate admin code',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating admin code:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      toast({
        title: 'Copied',
        description: 'Admin code copied to clipboard',
      });
    }
  };

  return (
    <Card className="bg-red-50 border-red-200">
      <CardHeader className="bg-red-100 border-b border-red-200">
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Shield className="h-5 w-5" />
          Admin Code Generator
        </CardTitle>
        <CardDescription className="text-red-700">
          Generate special redemption codes that grant administrator privileges
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="expireDays" className="text-red-800">Expiration (Days)</Label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              <Input
                id="expireDays"
                type="number"
                min={1}
                value={expireDays}
                onChange={(e) => setExpireDays(parseInt(e.target.value))}
                className="border-red-200 focus:border-red-500"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerateAdminCode}
            disabled={isGenerating}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Generate Admin Code
              </span>
            )}
          </Button>

          {generatedCode && (
            <div className="mt-4 p-3 bg-white border border-red-300 rounded-md">
              <p className="text-sm font-medium text-red-800 mb-1">Admin Code:</p>
              <div className="flex items-center gap-2">
                <code className="bg-red-50 px-2 py-1 rounded text-red-900 font-mono flex-1">
                  {generatedCode}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyCode}
                  className="border-red-300 hover:bg-red-100"
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-red-600 mt-2">
                This code will expire in {expireDays} days.
                Share it securely with trusted administrators only.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCodeGenerator;
