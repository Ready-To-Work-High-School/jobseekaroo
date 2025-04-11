
import Layout from '@/components/Layout';

const ResumeAssistant = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Resume Building Assistant</h1>
        <p className="text-lg mb-6">
          Dynamic resume creation tools with multiple templates and AI-assisted content suggestions tailored for high school students.
        </p>
        
        <div className="prose max-w-none">
          <h2>Key Features</h2>
          <ul>
            <li>Pre-designed templates optimized for entry-level positions</li>
            <li>AI-powered content suggestions based on your experiences</li>
            <li>Skills inventory builder to highlight your strengths</li>
            <li>Action verb recommendations to make your resume stand out</li>
            <li>Optimized formatting for both human readers and ATS systems</li>
          </ul>
          
          <h2>How It Works</h2>
          <p>
            Our Resume Assistant guides you through the process of creating a professional resume even if you have limited work experience. 
            The system helps you identify transferable skills from your academic, extracurricular, and volunteer experiences that are 
            relevant to employers.
          </p>
          
          <h2>Coming Soon</h2>
          <p>
            We're currently working on enhanced features for our Resume Assistant. Check back soon for updates!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAssistant;
