
import { CheckCircle2, Building, FileText, Users, Calendar, MessageCircle, BarChart2, UserCheck, Lock } from "lucide-react";

const PlatformBenefits = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="font-medium text-base">For Students</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Job Search:</strong> Browse through local job opportunities tailored for high school students.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Skills Development:</strong> Track your progress and identify areas for improvement.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Applications Tracking:</strong> Monitor all your job applications in one place.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Resume Assistant:</strong> Create and improve your resume with our AI-powered tools.</span>
          </li>
        </ul>
      </div>
      
      <div className="my-4 border-t border-gray-200"></div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-base">For Employers</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <Building className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Company Profile:</strong> Showcase your brand and workplace culture to students.</span>
          </li>
          <li className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Post Job Listings:</strong> Create detailed job opportunities for students.</span>
          </li>
          <li className="flex items-start gap-2">
            <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Applicant Management:</strong> Review and manage student applications.</span>
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Interview Scheduling:</strong> Schedule and track interviews with applicants.</span>
          </li>
          <li className="flex items-start gap-2">
            <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Messaging:</strong> Communicate directly with potential candidates.</span>
          </li>
          <li className="flex items-start gap-2">
            <BarChart2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Analytics:</strong> Track engagement and view application statistics.</span>
          </li>
          <li className="flex items-start gap-2">
            <UserCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Talent Matching:</strong> Find qualified candidates based on skill requirements.</span>
          </li>
          <li className="flex items-start gap-2">
            <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Privacy Controls:</strong> Manage who can view and apply to your listings.</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-3">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> This platform is exclusively for Westside High School students enrolled in the Entrepreneurship Academy and their employer partners.
        </p>
      </div>
    </div>
  );
};

export default PlatformBenefits;
