
import { useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { BriefcaseBusiness, GraduationCap, Users, Database, Cloud, Bot } from 'lucide-react';

// Job placement metrics
const metrics = [
  {
    id: 1,
    label: "Student Gains",
    value: "90%",
    icon: <GraduationCap className="h-8 w-8 text-amber-500" />,
    description: "of credentialed students gaining industry skills and experience"
  },
  {
    id: 2,
    label: "Employers Hiring",
    value: "52+",
    icon: <BriefcaseBusiness className="h-8 w-8 text-blue-500" />,
    description: "local employers actively recruiting from our platform"
  },
  {
    id: 3,
    label: "Community Growth",
    value: "200+",
    icon: <Users className="h-8 w-8 text-green-500" />,
    description: "students joined our community in the past year"
  }
];

// Company logos
const companies = [
  { name: "Tech Solutions Inc.", logo: "/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.png" },
  { name: "BuildRight Construction", logo: "/lovable-uploads/09aa9c55-7120-40c3-8212-c2c0ab608abc.png" },
  { name: "Jacksonville Memorial", logo: "/lovable-uploads/21bca716-a220-4a1d-a37a-3f6a052d0096.png" },
  { name: "City Services", logo: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png" },
  { name: "Retail Partners", logo: "/lovable-uploads/262213b1-e3e3-45bb-b551-e52e343ed995.png" },
  { name: "IBM Skills Build", logo: "/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png" },
  { name: "ESB", logo: "/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png" }
];

const JobPlacementsSection = () => {
  const fadeInSlow = useFadeIn(600);
  
  return (
    <section className={cn("py-16 bg-white", fadeInSlow)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Projected Goals</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform connects high school students with meaningful career opportunities through advanced skills training
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric) => (
            <div 
              key={metric.id} 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-50 p-3 rounded-full">
                  {metric.icon}
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-center text-gray-900">{metric.value}</h3>
              <p className="text-lg font-medium text-center text-gray-700 mt-2">{metric.label}</p>
              <p className="text-gray-500 text-center mt-2">{metric.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-16">
          <p className="text-gray-700 leading-relaxed">
            Westside High School students are gaining a competitive edge in the workforce before they even graduate through an advanced-level curriculum that covers Artificial Intelligence Foundations, Blockchain, Cloud Computing, Emerging Technologies, and the Internet of Things (IoT).
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">AI Foundations</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">Blockchain</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
              <Cloud className="h-5 w-5 text-sky-600" />
              <span className="text-sm font-medium">Cloud Computing</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <p className="text-center text-lg font-medium text-gray-700 mb-8">
            Trusted credentials and employer partners
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company) => (
              <div key={company.name} className="flex flex-col items-center">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="h-16 object-contain hover:scale-110 transition-all duration-300"
                />
                <span className="text-xs text-gray-500 mt-2">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPlacementsSection;
