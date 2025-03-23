
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Star, Zap } from "lucide-react";

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
  const ibmBadge = "/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png";
  const microsoftBadge = "/lovable-uploads/535a5afb-2d01-4358-a4a7-4844cd3ad3cf.png";
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-blue-800">Ready to Work Credentials</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {readyToWorkBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
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
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Industry Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-amber-200">
            <div className="relative">
              <Badge className="absolute -top-2 -right-2 bg-amber-500">ESB Certified</Badge>
              <img 
                src={esbBadge} 
                alt="Entrepreneurship & Small Business Certification" 
                className="w-24 h-24 object-contain mb-2" 
              />
            </div>
            <p className="text-sm font-medium text-center">Entrepreneurship & Small Business</p>
            <p className="text-xs text-gray-500 text-center mt-1">Industry-recognized certification</p>
          </div>
          
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-blue-200">
            <div className="relative">
              <Badge className="absolute -top-2 -right-2 bg-blue-500">IBM Skills</Badge>
              <img 
                src="/lovable-uploads/010059ca-3c6a-4e41-bcc3-d47749b4bd09.png" 
                alt="IBM Skills Build" 
                className="w-24 h-24 object-contain mb-2" 
              />
            </div>
            <p className="text-sm font-medium text-center">IBM Skills Build</p>
            <p className="text-xs text-gray-500 text-center mt-1">Digital badges in emerging technologies</p>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-blue-200">
            <div className="relative">
              <Badge className="absolute -top-2 -right-2 bg-blue-500">Microsoft</Badge>
              <img 
                src={microsoftBadge} 
                alt="Microsoft Certified Fundamentals" 
                className="w-24 h-24 object-contain mb-2" 
              />
            </div>
            <p className="text-sm font-medium text-center">Microsoft Certified</p>
            <p className="text-xs text-gray-500 text-center mt-1">Fundamentals certification</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center gap-2">
          <Star className="h-5 w-5 text-purple-500" />
          Additional Credentials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-purple-100">
            <Zap className="h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">Everfi Certifications</h4>
              <p className="text-sm text-gray-600">Financial literacy, data science, and workplace skills</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-blue-100">
            <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">Honors Distinction</h4>
              <p className="text-sm text-gray-600">Recognizing exceptional performance and dedication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialBadges;
