
import { CheckCircle2, Building, FileText, Users, Calendar, MessageCircle, BarChart2, UserCheck, Lock, TrendingUp, GraduationCap, Award } from "lucide-react";

const PlatformBenefits = () => {
  return <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <h3 className="font-medium text-base flex items-center mb-2">
          <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
          Untapped Niche for High School Students
        </h3>
        <p className="text-sm">
          While mainstream job platforms focus on professionals or take a broad approach, 
          we exclusively serve high school students seeking age-appropriate opportunities
        </p>
      </div>
    
      <div className="space-y-4">
        <h3 className="font-medium text-base flex items-center">
          <GraduationCap className="h-5 w-5 text-primary mr-1" />
          Educational Value for Students
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Job Search:</strong> Find local job opportunities specifically tailored for high school students (16-18).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Career Preparation:</strong> Build real-world skills that align with career-readiness programs like CTE.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Applications Tracking:</strong> Monitor all your job applications in one place to stay organized.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Resume Assistant:</strong> Create a professional resume highlighting your skills and achievements.</span>
          </li>
          <li className="flex items-start gap-2">
            <Award className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <span><strong>Early Work Experience:</strong> Gain valuable experience that colleges and future employers value.</span>
          </li>
        </ul>
      </div>
      
      <div className="my-4 border-t border-gray-200"></div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-base flex items-center">
          <Building className="h-5 w-5 text-primary mr-1" />
          For Employers Seeking Young Talent
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <Building className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Company Profile:</strong> Showcase your workplace culture to attract motivated students.</span>
          </li>
          <li className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Post Entry-Level Jobs:</strong> Create opportunities specifically for high school students.</span>
          </li>
          <li className="flex items-start gap-2">
            <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Pre-Vetted Candidates:</strong> Access students with verified skills and credentials.</span>
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Flexible Scheduling:</strong> Find students available for part-time, weekend, or seasonal work.</span>
          </li>
          <li className="flex items-start gap-2">
            <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Direct Communication:</strong> Connect with potential candidates within a safe environment.</span>
          </li>
          <li className="flex items-start gap-2">
            <BarChart2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Hiring Analytics:</strong> Track engagement and application statistics to optimize your listings.</span>
          </li>
        </ul>
      </div>
    </div>;
};

export default PlatformBenefits;
