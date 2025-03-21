
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Building, FileText, Users, Calendar, MessageCircle, BarChart2, UserCheck, Lock } from "lucide-react";
import BenefitItem from "@/components/auth/BenefitItem";

const SignInBenefitsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">What You'll Get Access To</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="font-medium text-base">For Students</h3>
          <ul className="space-y-3">
            <BenefitItem 
              icon={CheckCircle2} 
              text={<><strong>Job Search:</strong> Browse through local job opportunities tailored for high school students.</>} 
            />
            <BenefitItem 
              icon={CheckCircle2} 
              text={<><strong>Skills Development:</strong> Track your progress and identify areas for improvement.</>} 
            />
            <BenefitItem 
              icon={CheckCircle2} 
              text={<><strong>Applications Tracking:</strong> Monitor all your job applications in one place.</>} 
            />
            <BenefitItem 
              icon={CheckCircle2} 
              text={<><strong>Resume Assistant:</strong> Create and improve your resume with our AI-powered tools.</>} 
            />
          </ul>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <h3 className="font-medium text-base">For Employers</h3>
          <ul className="space-y-3">
            <BenefitItem 
              icon={Building} 
              text={<><strong>Company Profile:</strong> Showcase your brand and workplace culture to students.</>} 
            />
            <BenefitItem 
              icon={FileText} 
              text={<><strong>Post Job Listings:</strong> Create detailed job opportunities for students.</>} 
            />
            <BenefitItem 
              icon={Users} 
              text={<><strong>Applicant Management:</strong> Review and manage student applications.</>} 
            />
            <BenefitItem 
              icon={Calendar} 
              text={<><strong>Interview Scheduling:</strong> Schedule and track interviews with applicants.</>} 
            />
            <BenefitItem 
              icon={MessageCircle} 
              text={<><strong>Messaging:</strong> Communicate directly with potential candidates.</>} 
            />
            <BenefitItem 
              icon={BarChart2} 
              text={<><strong>Analytics:</strong> Track engagement and view application statistics.</>} 
            />
            <BenefitItem 
              icon={UserCheck} 
              text={<><strong>Talent Matching:</strong> Find qualified candidates based on skill requirements.</>} 
            />
            <BenefitItem 
              icon={Lock} 
              text={<><strong>Privacy Controls:</strong> Manage who can view and apply to your listings.</>} 
            />
          </ul>
        </div>
        
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-3">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> This platform is exclusively for Westside High School students enrolled in the Entrepreneurship Academy and their employer partners.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInBenefitsCard;
