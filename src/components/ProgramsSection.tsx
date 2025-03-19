
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default ProgramsSection;
