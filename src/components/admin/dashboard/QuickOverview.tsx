
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface QuickOverviewProps {
  users: any[];
  posts: any[];
}

const QuickOverview = ({ users, posts }: QuickOverviewProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <TooltipProvider>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Total Users</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of registered users in the system</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{users.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Total Posts</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of published content items</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{posts.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">System Status</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current system operational status</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-green-500 font-medium">Online</span>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
};

export default QuickOverview;
