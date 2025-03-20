import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mock-data';
import { useFadeIn } from '@/utils/animations';
import ProgramsSection from '@/components/ProgramsSection';

const Index = () => {
  const navigate = useNavigate();
  const sectionAnimation = useFadeIn(300);
  const featuredJobs = mockJobs.slice(0, 3);
  
  return (
    <Layout fullWidth withPadding={false}>
      <Hero />
      
      {/* Easy Jobs Section */}
      <section className="py-20 bg-amber-500">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Get Started
              </span>
              <h2 className="text-3xl font-bold mb-4 text-zinc-950">
                Easy Jobs for High School Students
              </h2>
              <p className="mb-6 text-base text-zinc-900">
                Finding your first job can be challenging, but we've made it simple. 
                Browse opportunities specifically designed for students with little 
                to no prior work experience.
              </p>
              <ul className="space-y-3 mb-8">
                {['No experience required for most positions', 'Flexible schedules that work around your classes', 'Local opportunities to minimize commute time', 'Build valuable skills for your future career'].map((item, i) => <li key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>)}
              </ul>
              <button onClick={() => navigate('/jobs')} className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus-ring">
                Find Your First Job
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl transform -rotate-3" />
              <img alt="High school student working at a coffee shop" src="/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg" className="rounded-2xl border border-border shadow-lg w-full relative z-10 object-cover h-[400px]" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Opportunities Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-700">
              Trending Now
            </span>
            <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Current jobs available for high school students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/jobs')} 
              className="px-6 py-3 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors focus-ring"
            >
              View All Jobs
            </button>
          </div>
        </div>
      </section>
      
      <ProgramsSection />
    </Layout>
  );
};

export default Index;
