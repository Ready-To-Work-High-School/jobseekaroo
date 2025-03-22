import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
const CourseCurriculum = () => {
  return <div className="md:w-1/2">
      <div className="flex items-center gap-2 mb-4 mx-[45px]">
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
        <h4 className="text-lg font-semibold text-center">Course Curriculum</h4>
      </div>
      
      <Accordion type="single" collapsible className="bg-white rounded-lg p-5 shadow-sm border border-border">
        <AccordionItem value="year1" className="border-b">
          <AccordionTrigger className="flex items-start gap-2">
            <span className="     text-base font-bold text-left">Year 1: Introduction to Entrepreneurship</span>
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-3">
            <ul className="space-y-3">
              {["Business Fundamentals & Career Planning", "Introduction to Business Ownership Models", "Marketing & Sales Foundations", "Communication Skills for Business"].map((item, index) => <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold">{item}</span>
                </li>)}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="year2" className="border-b">
          <AccordionTrigger className="px-0 py-3 hover:no-underline">
            <span className="text-base font-bold">Year 2: Business Management &amp; Law</span>
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-3">
            <ul className="space-y-3">
              {["Financial Literacy & Accounting Basics", "Business Plan Development", "Market Research & Analysis", "Digital Marketing Strategies"].map((item, index) => <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold">{item}</span>
                </li>)}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="year3" className="border-b">
          <AccordionTrigger className="px-0 py-3 hover:no-underline">
            <span className="text-base font-bold">Year 3: Business Ownership</span>
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-3">
            <ul className="space-y-3">
              {["Startup Funding & Investment Strategies", "Business Law & Ethics", "E-commerce & Digital Business Models", "Leadership & Team Management"].map((item, index) => <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold">{item}</span>
                </li>)}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="year4">
          <AccordionTrigger className="px-0 py-3 hover:no-underline">
            <span className="text-base font-bold">Capstone &amp; Certification</span>
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-3">
            <ul className="space-y-3">
              {["Business Launch Project (Capstone)", "ESB Certification Preparation", "Advanced Business Operations", "Internship & Professional Portfolio Development"].map((item, index) => <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold">{item}</span>
                </li>)}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>;
};
export default CourseCurriculum;