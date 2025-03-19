
import { useFadeIn } from '@/utils/animations';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  
  return (
    <section className={`py-16 bg-white ${animation}`}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Career Readiness
          </span>
          <h2 className="text-3xl font-bold mb-4">Educational Programs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover specialized programs that help prepare high school students for their future careers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full relative h-40 overflow-hidden">
              <img 
                src="/lovable-uploads/21bca716-a220-4a1d-a37a-3f6a052d0096.png" 
                alt="ESB - Entrepreneurship and Small Business"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Entrepreneurship & Small Business</h3>
              <p className="text-muted-foreground mb-4">
                Learn the fundamentals of starting and running your own business with the ESB certification program.
              </p>
              <a 
                href="#" 
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
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
              <img 
                src="/lovable-uploads/ddd8b723-4e16-4c33-8a98-ffac9d6cec5c.png" 
                alt="Improving Post-Secondary Readiness"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Post-Secondary Readiness</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive programs designed to prepare high school students for college and future careers.
              </p>
              <a 
                href="#" 
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
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
              <img 
                src="/lovable-uploads/521bdc87-8068-492d-8a0c-7281a4c42c5a.png" 
                alt="Duval Ready Diploma Designation"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Duval Ready Diploma</h3>
              <p className="text-muted-foreground mb-4">
                Earn a specialized diploma designation that signals career readiness to future employers.
              </p>
              <a 
                href="#" 
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* New Skill Badges Section */}
        <div className="text-center mb-10">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Essential Skills
          </span>
          <h2 className="text-3xl font-bold mb-4">Duval County Career Skills Badges</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn these digital badges to showcase your career-ready skills to potential employers
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          <div className="skill-badge hover:scale-105 transition-transform">
            <img 
              src="/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png" 
              alt="Career Exploration Badge" 
              className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto"
            />
            <p className="text-center text-sm font-medium mt-2">Career Exploration</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img 
              src="/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png" 
              alt="Communication Badge" 
              className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto"
            />
            <p className="text-center text-sm font-medium mt-2">Communication</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img 
              src="/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png" 
              alt="Professionalism Badge" 
              className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto"
            />
            <p className="text-center text-sm font-medium mt-2">Professionalism</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img 
              src="/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png" 
              alt="Florida Soft Skills Badge" 
              className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto"
            />
            <p className="text-center text-sm font-medium mt-2">Florida Soft Skills</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img 
              src="/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.png" 
              alt="Team Building Badge" 
              className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto"
            />
            <p className="text-center text-sm font-medium mt-2">Team Building</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img 
              src="/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.png" 
              alt="Capstone Experience Badge" 
              className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto"
            />
            <p className="text-center text-sm font-medium mt-2">Capstone Experience</p>
          </div>
          
          <div className="skill-badge hover:scale-105 transition-transform">
            <img 
              src="/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.png" 
              alt="Problem Solving Badge" 
              className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto"
            />
            <p className="text-center text-sm font-medium mt-2">Problem Solving</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus-ring"
          >
            Explore All Skill Badges
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
