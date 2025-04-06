
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PresentationChart, Users, TrendingUp, Sparkles } from 'lucide-react';

const ValueProposition = () => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Value Delivered</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader className="bg-amber-50 border-b border-amber-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-600" />
              Custom Profiles
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-muted-foreground">
              Stand out to students with visuals, detailed requirements, and featured placement options that help you save time by filtering applicants more effectively.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 mt-1" />
                <span className="text-sm">Branded job listings with your company colors and logo</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 mt-1" />
                <span className="text-sm">Priority placement in search results and featured sections</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 mt-1" />
                <span className="text-sm">Detailed skill requirement matching to reduce unqualified applications</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <PresentationChart className="h-5 w-5 text-blue-600" />
              Advanced Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-muted-foreground">
              Get valuable insights into your hiring process with detailed analytics that show you exactly how your job postings are performing and which candidates best match your requirements.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mt-1" />
                <span className="text-sm">Detailed metrics: "10 applied, 3 interviewed, 2 hired"</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mt-1" />
                <span className="text-sm">Skill match scoring to identify top candidates faster</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mt-1" />
                <span className="text-sm">ROI tracking to measure the effectiveness of your listings</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ValueProposition;
