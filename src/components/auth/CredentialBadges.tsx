
import { Badge } from "@/components/ui/badge";
import { Award, Shield } from "lucide-react";

const CredentialBadges = () => {
  // Credential badge data
  const readyToWorkBadges = [
    {
      image: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png",
      name: "Career Exploration"
    },
    {
      image: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png",
      name: "Communication"
    },
    {
      image: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png",
      name: "Professionalism"
    },
    {
      image: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png",
      name: "Florida Soft Skills"
    }
  ];
  
  const esbBadge = "/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png";

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Industry-Recognized Credentials</h3>
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          <Badge variant="brandSolid" className="text-sm py-1">
            <Award className="h-4 w-4 mr-1" />
            Florida Ready to Work
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {readyToWorkBadges.map((badge, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 relative hover:scale-110 transition-transform duration-200">
              <img 
                src={badge.image} 
                alt={badge.name} 
                className="w-full h-full object-contain" 
              />
            </div>
            <p className="text-xs text-center mt-1">{badge.name}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col items-center mt-4">
        <Badge variant="new" className="text-sm py-1 mb-3">
          <Shield className="h-4 w-4 mr-1" />
          ESB Certification
        </Badge>
        
        <div className="relative w-16 h-16 hover:scale-110 transition-transform duration-200">
          <img 
            src={esbBadge} 
            alt="ESB Certification" 
            className="w-full h-full object-contain relative z-10 rounded-md" 
          />
        </div>
        <p className="text-xs text-center mt-2">Entrepreneurship & Small Business</p>
      </div>
    </div>
  );
};

export default CredentialBadges;
