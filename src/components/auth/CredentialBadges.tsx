
import { Badge } from "@/components/ui/badge";
import { Award, Shield, BadgeCheck } from "lucide-react";

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
  
  return (
    <div className="space-y-6">
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
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Industry Certification
        </h3>
        <div className="flex justify-center">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-amber-200">
            <div className="relative">
              <Badge variant="amber" className="absolute -top-2 -right-2">ESB Certified</Badge>
              <img 
                src={esbBadge} 
                alt="ESB Certification" 
                className="w-32 h-32 object-contain" 
              />
            </div>
            <p className="mt-2 font-medium text-center">Entrepreneurship & Small Business</p>
            <p className="text-xs text-gray-600 text-center">Industry-standard credential by Certiport</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-blue-500" />
          IBM Skills Build
        </h3>
        <div className="flex justify-center">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-blue-200">
            <div className="relative">
              <Badge variant="info" className="absolute -top-2 -right-2">IBM</Badge>
              <img 
                alt="IBM Skills Build" 
                className="w-32 h-32 object-contain" 
                src="/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.png" 
              />
            </div>
            <p className="mt-2 font-medium text-center">IBM Skills Build</p>
            <p className="text-xs text-gray-600 text-center">Career readiness certification pathway</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialBadges;
