
import { Badge } from "@/components/ui/badge";
import { Award, Shield } from "lucide-react";

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
          Industry Certification
        </h3>
        <div className="flex justify-center">
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-amber-200 max-w-xs">
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
        </div>
      </div>
    </div>
  );
};

export default CredentialBadges;
