
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFadeIn } from '@/utils/animations';
import { ExternalLink } from 'lucide-react';

const ResourcesSection = () => {
  const navigate = useNavigate();
  const fadeInSlow = useFadeIn(600);
  
  return (
    <section className="py-12 bg-white" aria-labelledby="resources-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 id="resources-heading" className="text-2xl font-bold sm:text-3xl mb-3">
            Resources to Help You Succeed
          </h2>
          <p className="text-muted-foreground">
            Take advantage of our free tools and resources to advance your career
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-amber-100">
            <h3 className="text-lg font-semibold mb-2">Resume Assistant</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI-powered resume builder will help you create a professional resume that stands out.
            </p>
            <Button variant="outline" onClick={() => navigate('/resume-assistant')}>
              Build Your Resume
            </Button>
          </div>
          
          <div className="p-6 rounded-lg bg-amber-100">
            <h3 className="text-lg font-semibold mb-2">Florida Ready to Work</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn essential employability skills to enhance your career readiness and job prospects.
            </p>
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="https://www.floridareadytowork.com/employability-skills" target="_blank" rel="noopener noreferrer">
                Employability Skills
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="p-6 rounded-lg bg-amber-100">
            <h3 className="text-lg font-semibold mb-2">ESB Certification</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn about the Entrepreneurship & Small Business certification and how it can benefit your career.
            </p>
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="https://www.youtube.com/watch?v=bjjLKdTgl6g" target="_blank" rel="noopener noreferrer">
                What is ESB?
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
