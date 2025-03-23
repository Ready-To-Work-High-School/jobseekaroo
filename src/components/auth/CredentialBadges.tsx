
import { Badge } from "@/components/ui/badge";
import { Award, BadgeCheck, Shield } from "lucide-react";

const CredentialBadges = () => {
  // Credential badge data
  const readyToWorkBadges = [{
    image: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png",
    name: "Career Exploration"
  }, {
    image: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png",
    name: "Communication"
  }, {
    image: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png",
    name: "Professionalism"
  }, {
    image: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png",
    name: "Florida Soft Skills"
  }];
  
  const esbBadge = "/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png";
  
  // IBM SkillsBuild badge data
  const ibmBadges = [
    {
      image: "/lovable-uploads/19e761ce-d27d-4894-a1e6-0cb63237cbcf.png",
      name: "AI Foundations",
      description: "A collaboration of ISTE and IBM"
    },
    {
      image: "/lovable-uploads/73338594-5fa4-499d-8fa6-880f21b770ef.png",
      name: "Explore Emerging Tech",
      description: "IBM SkillsBuild"
    },
    {
      image: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png",
      name: "IBM AI Foundations for Educators",
      description: "Online and On-Demand Institutes"
    },
    {
      image: "/lovable-uploads/54345058-d5eb-4d91-a38b-197094c4ea72.png",
      name: "Entrepreneurship Business Essentials",
      description: "IBM SkillsBuild"
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Industry Certifications - Moved to the top */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Industry Certifications
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {/* ESB Certification Badge with enhanced styling */}
          <div className="flex flex-col items-center p-5 bg-gradient-to-b from-blue-50 to-amber-50 rounded-lg shadow-lg border border-amber-300">
            <div className="relative">
              <Badge variant="amber" className="absolute -top-2 -right-2 z-20 px-4 py-1 text-sm">ESB Certified</Badge>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/40 rounded-full blur-lg animate-pulse"></div>
                <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-md animate-pulse delay-700"></div>
                <img 
                  src={esbBadge} 
                  alt="ESB Certification" 
                  className="w-40 h-40 object-contain relative z-10" 
                />
              </div>
            </div>
            <p className="mt-3 font-bold text-center text-lg">Entrepreneurship & Small Business</p>
            <p className="text-sm text-gray-600 text-center">Industry-standard credential by Certiport</p>
          </div>
          
          {/* NCLEX Badge (previously Medical) with enhanced styling */}
          <div className="flex flex-col items-center p-5 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg shadow-lg border border-blue-300">
            <div className="relative">
              <Badge variant="info" className="absolute -top-2 -right-2 z-20 px-4 py-1 text-sm">NCLEX Certified</Badge>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-lg animate-pulse"></div>
                <img 
                  alt="NCLEX Certification" 
                  className="w-40 h-40 object-contain relative z-10" 
                  src="/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.png" 
                />
              </div>
            </div>
            <p className="mt-3 font-bold text-center text-lg">Medical Academy</p>
            <p className="text-sm text-gray-600 text-center">Healthcare career pathway</p>
          </div>
        </div>
      </div>
      
      {/* Ready to Work Credentials - Moved down */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-blue-800">Ready to Work Credentials</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {readyToWorkBadges.map((badge, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
            >
              <img 
                src={badge.image} 
                alt={badge.name} 
                className="w-16 h-16 object-contain mb-2" 
              />
              <p className="text-sm font-medium text-center">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-blue-500" />
          IBM Skills Build Credentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ibmBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-blue-200">
              <div className="relative">
                <Badge variant="info" className="absolute -top-2 -right-2 z-20">IBM</Badge>
                <img 
                  src={badge.image} 
                  alt={badge.name} 
                  className="w-28 h-28 object-contain" 
                />
              </div>
              <p className="mt-2 font-medium text-center">{badge.name}</p>
              <p className="text-xs text-gray-600 text-center">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredentialBadges;
