
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import CredentialsBadges from './programs/CredentialsBadges';
import { Separator } from './ui/separator';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { cn } from '@/lib/utils';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  return <>
      <Separator className="max-w-4xl mx-auto my-8" />
      <section className={`py-16 bg-secondary/5 ${animation}`}>
        <div className="container-custom">
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
