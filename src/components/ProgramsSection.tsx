
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import { Alert, AlertDescription } from './ui/alert';
import { cn } from '@/lib/utils';
import SectionSeparator from './home/SectionSeparator';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { protectElement } from '@/utils/textProtection';
import { Card, CardContent } from './ui/card';
import { Sparkles, GraduationCap, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  const {
    user
  } = useAuth();
  const sectionRef = useRef<HTMLElement>(null);

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  // Apply text protection to the section
  useEffect(() => {
    if (sectionRef.current) {
      protectElement(sectionRef.current);
    }
  }, []);

  return <section ref={sectionRef} className={`py-16 bg-secondary/5 ${animation} protected-content`}>
      <div className="container-custom">
        {/* For Employers Only heading placed outside the blue section - stretched full width */}
        <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center w-full")}>
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 py-3 font-bold text-blue-800 text-center text-3xl w-full block md:text-5xl">
            For Employers Only
          </span>
        </h2>
        
        {/* Employers Section - Simplified without burst image */}
        <div className="mb-12">
          <div className="flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto text-center">
            <Card className="w-full glow-purple rounded-xl overflow-hidden border-purple-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
                  <h3 className="font-extrabold text-xl md:text-2xl text-zinc-800">
                    Hiring Opportunity
                  </h3>
                </div>
                
                <p className="font-medium text-lg mb-6">
                  Connect with our academy to find pre-trained students with industry-recognized credentials ready for your workforce.
                </p>
                
                <a 
                  href="mailto:ColemanP3@duvalschools.org" 
                  className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Contact Us Today
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-16">
          {/* Academy Card with Link to Full Page */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-200">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img src="/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png" alt="Westside High School Logo" className="h-14 w-auto object-fill" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-left">Entrepreneurship Academy at Westside High School</h3>
                  <p className="text-base text-gray-950">Career Technical Education | Duval County School District</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                The Entrepreneurship Academy is designated as an Advanced Academy, offering a rigorous curriculum with accelerated coursework, 
                industry certifications, and college credit opportunities. Students gain real-world business experience through managing the school store 
                and participate in professional development opportunities.
              </p>
              
              <div className="flex justify-center">
                <Button className="bg-blue-700 hover:bg-blue-800" asChild>
                  <Link to="/academy">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Learn More About Our Academy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <ProgramCards />
        </div>
      </div>
    </section>;
};
export default ProgramsSection;
