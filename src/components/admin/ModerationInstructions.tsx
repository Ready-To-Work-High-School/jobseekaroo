
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Users, 
  User 
} from 'lucide-react';

export const ModerationInstructions = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-6 border-blue-100 bg-blue-50/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Message Moderation Instructions</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 mr-1" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-1" />
            )}
            {isExpanded ? 'Hide' : 'Show'} Instructions
          </Button>
        </div>
        {!isExpanded && (
          <CardDescription>
            Click "Show Instructions" to learn about the message moderation system
          </CardDescription>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                Admin Access
              </h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>As an administrator, you have full access to the message moderation system</li>
                <li>Navigate to this page by clicking on "Admin" in the main navigation, then "Message Moderation"</li>
                <li>You can approve or reject messages that have been flagged for moderation</li>
                <li>Approved messages will be delivered to recipients, rejected messages will be permanently removed</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-medium flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                Moderator Access
              </h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Moderators must be granted access by an administrator</li>
                <li>To request moderator access, contact your system administrator</li>
                <li>Once granted access, you can access this page through the "Admin" menu</li>
                <li>Moderators can approve or reject messages but cannot modify system settings</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-medium flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-600" />
                Regular User Information
              </h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Regular users do not have access to the moderation system</li>
                <li>Messages that contain certain keywords or patterns may be held for moderation</li>
                <li>If your message is awaiting moderation, the recipient will not see it until it's approved</li>
                <li>For questions about message moderation, please contact an administrator</li>
              </ul>
            </div>
            
            <div className="bg-blue-100 p-3 rounded-md mt-2">
              <p className="text-sm font-medium text-blue-800">Need further assistance?</p>
              <p className="text-xs text-blue-700">
                Contact the system administrator or refer to the complete documentation in the Admin Help Center.
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
