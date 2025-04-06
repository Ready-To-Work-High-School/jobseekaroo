
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFadeIn } from '@/utils/animations';
import { ExternalLink, Heart, Award, BookOpen } from 'lucide-react';

const ResourcesSection = () => {
  const navigate = useNavigate();
  const fadeInSlow = useFadeIn(600);
  
  return (
    <section className="py-12 bg-white relative overflow-hidden" aria-labelledby="resources-heading">
      {/* Decorative floating accents */}
      <div className="student-float-accent top-10 right-[10%]"></div>
      <div className="student-float-accent-lavender bottom-20 left-[15%]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center items-center mb-2">
            <Award className="h-6 w-6 text-gold-500 mr-2" />
            <h2 id="resources-heading" className="text-2xl font-bold sm:text-3xl bg-gradient-to-r from-gold-500 to-lavender-500 bg-clip-text text-transparent">
              Resources to Help You Succeed
            </h2>
          </div>
          <p className="text-muted-foreground">
            Take advantage of our free tools and resources to advance your career
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 student-card-hover border border-amber-200">
            <div className="flex items-start mb-3">
              <BookOpen className="h-6 w-6 text-gold-500 mr-2" />
              <h3 className="text-lg font-semibold">Resume Assistant</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI-powered resume builder will help you create a professional resume that stands out.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/resume-assistant')}
              className="border-gold-400/30 hover:bg-gold-400/10"
            >
              Build Your Resume
            </Button>
          </div>
          
          <div className="p-6 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 student-card-hover border border-amber-200">
            <div className="flex items-start mb-3">
              <Heart className="h-6 w-6 text-lavender-500 mr-2" />
              <h3 className="text-lg font-semibold">Florida Ready to Work</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Learn essential employability skills to enhance your career readiness and job prospects.
            </p>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-lavender-400/30 hover:bg-lavender-400/10" 
              asChild
            >
              <a href="https://www.floridareadytowork.com/employability-skills" target="_blank" rel="noopener noreferrer">
                Employability Skills
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="p-6 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 student-card-hover border border-amber-200">
            <div className="flex items-start mb-3">
              <BookOpen className="h-6 w-6 text-gold-500 mr-2" />
              <h3 className="text-lg font-semibold">Interview Warmup</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Practice interviewing with Google's interactive tool to prepare for your next job interview.
            </p>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-gold-400/30 hover:bg-gold-400/10" 
              asChild
            >
              <a href="https://grow.google/certificates/interview-warmup/" target="_blank" rel="noopener noreferrer">
                Try Interview Warmup
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
