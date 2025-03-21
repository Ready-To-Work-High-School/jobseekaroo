import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const WestsideAcademy = () => {
  return <div className="rounded-xl overflow-hidden shadow-md mb-12 bg-secondary/10">
      <div className="p-6 md:p-8 bg-sky-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <img src="/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png" alt="Westside High School Logo" className="h-14 w-auto object-fill" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Entrepreneurship Academy at Westside High School</h3>
            <p className="text-base text-gray-950">Career Technical Education | Duval County School District</p>
          </div>
        </div>
        
        <AcademyDescription />
        
        <div className="flex flex-col md:flex-row gap-6">
          <ProgramBenefits />
          <CourseCurriculum />
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300"></div>
    </div>;
};

const AcademyDescription = () => {
  return <div className="bg-white p-4 rounded-lg mb-6">
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
    </div>;
};

const ProgramBenefits = () => {
  return <div className="md:w-1/2">
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
          <span className="font-bold">Industry certifications in Entrepreneurship & Small Business</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="font-bold">College credit through dual enrollment opportunities</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="font-bold">Real-world business experience through community partnerships</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="font-bold">Preferential consideration for scholarships and internships</span>
        </li>
      </ul>
    </div>;
};

const CourseCurriculum = () => {
  return <div className="md:w-1/2">
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
        <CourseYearItem value="year1" title="Year 1: Introduction to Entrepreneurship">
          <CourseItemList items={["Business Fundamentals & Career Planning", "Introduction to Business Ownership Models", "Marketing & Sales Foundations", "Communication Skills for Business"]} />
        </CourseYearItem>
        
        <CourseYearItem value="year2" title="Year 2: Business Management &amp; Law">
          <CourseItemList items={["Financial Literacy & Accounting Basics", "Business Plan Development", "Market Research & Analysis", "Digital Marketing Strategies"]} />
        </CourseYearItem>
        
        <CourseYearItem value="year3" title="Year 3: Business Ownership">
          <CourseItemList items={["Startup Funding & Investment Strategies", "Business Law & Ethics", "E-commerce & Digital Business Models", "Leadership & Team Management"]} />
        </CourseYearItem>
        
        <CourseYearItem value="year4" title="Capstone &amp; Certification">
          <CourseItemList items={["Business Launch Project (Capstone)", "ESB Certification Preparation", "Advanced Business Operations", "Internship & Professional Portfolio Development"]} />
        </CourseYearItem>
      </Accordion>
    </div>;
};

const CourseYearItem = ({
  value,
  title,
  children
}) => {
  return <AccordionItem value={value}>
      <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
        <span className="font-semibold text-left">{title}</span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-4 pt-0">
        {children}
      </AccordionContent>
    </AccordionItem>;
};

const CourseItemList = ({
  items
}) => {
  return <ul className="space-y-2">
      {items.map((item, index) => <li key={index} className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>)}
    </ul>;
};

export default WestsideAcademy;
