import { useFadeIn } from '@/utils/animations';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight } from 'lucide-react';
const ProgramsSection = () => {
  const animation = useFadeIn(300);
  return <section className={`py-16 bg-white ${animation}`}>
      <div className="container-custom bg-amber-500">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Career Readiness
          </span>
          <h2 className="text-3xl font-bold mb-4">Educational Programs</h2>
          <p className="max-w-2xl mx-auto font-semibold text-zinc-950">
            Discover specialized programs that help prepare high school students for their future careers
          </p>
        </div>
        
        {/* Westside High School Academy Information */}
        <div className="border border-border rounded-xl overflow-hidden shadow-md mb-12 bg-secondary/10">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <img src="/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png" alt="Westside High School Logo" className="h-16 w-auto" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Entrepreneurship Academy at Westside High School</h3>
                <p className="text-base text-gray-950">Career Technical Education Division | Duval County School District</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                    <circle cx="17" cy="7" r="5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Advanced Academy Program</h4>
                  <p className="text-muted-foreground">
                    The Entrepreneurship Academy is designated as an Advanced Academy, which means it offers a rigorous curriculum with accelerated coursework, industry certifications, and college credit opportunities. Advanced Academies prepare students for both higher education and direct entry into competitive career fields with high skill and wage potential.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold">Program Benefits</h4>
                </div>
                <ul className="bg-white rounded-lg p-5 shadow-sm border border-border space-y-3">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Industry certifications in Entrepreneurship & Small Business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>College credit through dual enrollment opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Real-world business experience through community partnerships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Preferential consideration for scholarships and internships</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      <path d="M12 11h4" />
                      <path d="M12 16h4" />
                      <path d="M8 11h.01" />
                      <path d="M8 16h.01" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold">Course Curriculum</h4>
                </div>
                
                <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm border border-border">
                  <AccordionItem value="year1">
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
                      <span className="font-semibold text-left">Year 1: Introduction to Entrepreneurship</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Business Fundamentals & Career Planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Introduction to Business Ownership Models</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Marketing & Sales Foundations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Communication Skills for Business</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="year2">
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
                      <span className="font-semibold text-left"> Year 2: Business Management &amp; Law
                    </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Financial Literacy & Accounting Basics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Business Plan Development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Market Research & Analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Digital Marketing Strategies</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="year3">
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
                      <span className="font-semibold">Year 3: Business Ownership</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Startup Funding & Investment Strategies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Business Law & Ethics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>E-commerce & Digital Business Models</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Leadership & Team Management</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="year4">
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
                      <span className="font-semibold text-left">Capstone &amp; Certification</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Business Launch Project (Capstone)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>ESB Certification Preparation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Advanced Business Operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Internship & Professional Portfolio Development</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full relative h-40 overflow-hidden">
              <img src="/lovable-uploads/21bca716-a220-4a1d-a37a-3f6a052d0096.png" alt="ESB - Entrepreneurship and Small Business" className="w-full h-full object-scale-down" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Entrepreneurship & Small Business</h3>
              <p className="text-muted-foreground mb-4">
                Learn the fundamentals of starting and running your own business with the ESB certification program.
              </p>
              <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full relative h-40 overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
              
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Post-Secondary Readiness</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive programs designed to prepare high school students for college and future careers.
              </p>
              <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full relative h-40 overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
              <img src="/lovable-uploads/521bdc87-8068-492d-8a0c-7281a4c42c5a.png" alt="Duval Ready Diploma Designation" className="w-full h-full object-contain p-4" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Duval Ready Diploma</h3>
              <p className="text-muted-foreground mb-4">
                Earn a specialized diploma designation that signals career readiness to future employers.
              </p>
              <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Essential Skills
          </span>
          <h2 className="text-3xl font-bold mb-4">Duval County Career Skills Badges</h2>
          <p className="max-w-2xl mx-auto text-base font-normal text-gray-950">
            Earn these digital badges to showcase your career-ready skills to potential employers
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          <div className="skill-badge hover:scale-105 transition-transform">
            <img src="/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png" alt="Career Exploration Badge" className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
            <p className="text-center text-sm font-medium mt-2">Career Exploration</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img src="/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png" alt="Communication Badge" className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
            <p className="text-center text-sm font-medium mt-2">Communication</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img src="/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png" alt="Professionalism Badge" className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
            <p className="text-center text-sm font-medium mt-2">Professionalism</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img src="/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png" alt="Florida Soft Skills Badge" className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
            <p className="text-center text-sm font-medium mt-2">Florida Soft Skills</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img src="/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.png" alt="Team Building Badge" className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
            <p className="text-center text-sm font-medium mt-2">Team Building</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img src="/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.png" alt="Capstone Experience Badge" className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
            <p className="text-center text-sm font-medium mt-2">Capstone Experience</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img src="/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.png" alt="Problem Solving Badge" className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
            <p className="text-center text-sm font-medium mt-2">Problem Solving</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus-ring">
            Explore All Skill Badges
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>;
};
export default ProgramsSection;