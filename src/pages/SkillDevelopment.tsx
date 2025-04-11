
import Layout from '@/components/Layout';

const SkillDevelopment = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Skill Development</h1>
        <p className="text-lg mb-6">
          Access to training resources and skill-building opportunities to help students prepare for the workforce.
        </p>
        
        <div className="prose max-w-none">
          <h2>What We Offer</h2>
          <ul>
            <li>Interactive training modules focused on in-demand skills</li>
            <li>Personalized learning paths based on career interests</li>
            <li>Industry-recognized certifications and credentials</li>
            <li>Hands-on practical exercises that build real-world experience</li>
          </ul>
          
          <h2>How It Works</h2>
          <p>
            Our skill development platform uses adaptive learning technology to identify your strengths and areas for improvement. 
            Based on your career interests and existing skillset, we create a customized learning journey to help you build the 
            competencies employers are looking for.
          </p>
          
          <h2>Coming Soon</h2>
          <p>
            We're currently expanding our skill development offerings. Check back soon for more updates and features!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SkillDevelopment;
