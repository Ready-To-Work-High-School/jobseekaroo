
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const EarnBadgeSection = () => {
  const { user } = useAuth();
  
  return (
    <Card className="border-amber-200 shadow-md mb-8">
      <CardHeader className="bg-amber-50 border-b border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-xl">Earn Career Badges</CardTitle>
          </div>
          <Badge variant="outline" className="bg-amber-100 border-amber-300 text-amber-800">
            Skills Development
          </Badge>
        </div>
        <CardDescription>
          Complete quizzes and assessments to earn badges that showcase your skills to employers
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              Available Badges
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Professional Communication</li>
              <li>• Team Collaboration</li>
              <li>• Problem Solving</li>
              <li>• Workplace Ethics</li>
              <li>• Digital Literacy</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Benefits of Badges
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Stand out to employers</li>
              <li>• Verify your skills</li>
              <li>• Build your digital portfolio</li>
              <li>• Track your progress</li>
              <li>• Share on social media</li>
            </ul>
          </div>
        </div>
        
        {user ? (
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/skill-development?tab=badges" className="flex items-center gap-2">
                Start Earning Badges <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/sign-in?redirect=/skill-development?tab=badges" className="flex items-center gap-2">
                Sign In to Earn Badges <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EarnBadgeSection;
