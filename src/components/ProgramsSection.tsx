import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import CredentialsBadges from './programs/CredentialsBadges';
import { Separator } from './ui/separator';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
const ProgramsSection = () => {
  const animation = useFadeIn(300);
  return <>
      <Separator className="max-w-4xl mx-auto my-8" />
      <section className={`py-16 bg-secondary/5 ${animation}`}>
        <div className="container-custom">
          <div className="border border-amber-300 rounded-lg p-6 mb-8 bg-sky-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs bg-amber-500 text-stone-950 font-bold">
                  Employer Resources
                </span>
                <h2 className="text-3xl font-bold mb-3 text-red-700 text-center">For Employers Only</h2>
                <p className="text-center font-bold text-zinc-900">
                  Learn how students in the Entrepreneurship Academy receive intensive specialized curriculum that prepares them with verified skills and credentials employers value
                </p>
              </div>
              <img src="/lovable-uploads/262213b1-e3e3-45bb-b551-e52e343ed995.png" alt="Career & Technical Education Logo" className="h-20 md:h-24 w-auto object-scale-down" />
            </div>
            
            <Alert className="mt-4 bg-amber-50 border-amber-300">
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