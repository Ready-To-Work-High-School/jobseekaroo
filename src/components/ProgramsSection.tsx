
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import CredentialsBadges from './programs/CredentialsBadges';
import { Separator } from './ui/separator';
import { AlertTriangle, Mail, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  const contactAnimation = useFadeIn(500);
  const studentAnimation = useFadeIn(400);
  
  return <>
      <Separator className="max-w-4xl mx-auto my-8" />
      <section className={`py-16 bg-secondary/5 ${animation}`}>
        <div className="container-custom">
          {/* Students Section */}
          <div className="border border-blue-300 rounded-lg p-6 mb-8 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center">
              <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight mt-2")}>
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Find the perfect entry level job for credential holders
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-center font-medium text-zinc-800 mb-6">
                Discover opportunities specifically designed for students with industry credentials and training from our academy programs.
              </p>
              
              <div className={cn("flex justify-center", studentAnimation)}>
                <Link 
                  to="/jobs"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md text-lg"
                >
                  <Search className="h-5 w-5" />
                  <span className="font-medium">Browse Available Jobs</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Employers Section */}
          <div className="border border-amber-300 rounded-lg p-6 mb-8 bg-sky-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight mt-2 text-center")}>
                  <span className="bg-gradient-to-r from-zinc-800 via-amber-700 to-zinc-900 bg-clip-text text-transparent">
                    <em>For Employers Only</em>
                  </span>
                </h2>
                <p className="text-center font-bold text-zinc-900">
                  Learn how students in the Entrepreneurship Academy receive intensive specialized curriculum that prepares them with verified skills and credentials employers value
                </p>
              </div>
              <img src="/lovable-uploads/262213b1-e3e3-45bb-b551-e52e343ed995.png" alt="Career & Technical Education Logo" className="h-12 md:h-22 w-auto object-scale-down" />
            </div>
            
            <Alert className="mt-4 border-amber-300 bg-zinc-50">
              <AlertTriangle className="h-4 w-4 text-red-700 font-extrabold" />
              <AlertTitle className="text-zinc-900 font-extrabold">Hiring Opportunity</AlertTitle>
              <AlertDescription className="text-center font-bold text-zinc-900">
                Connect with our academy to find pre-trained students with industry-recognized credentials ready for your workforce.
              </AlertDescription>
            </Alert>

            <div className={cn("mt-6 flex justify-center", contactAnimation)}>
              <a 
                href="mailto:Colemanp3@duvalschools.org"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-md text-lg"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">For more information contact me</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-16">
            <WestsideAcademy />
            
            <ProgramCards />
            
            <CredentialsBadges />
          </div>
        </div>
      </section>
    </>;
};
export default ProgramsSection;
