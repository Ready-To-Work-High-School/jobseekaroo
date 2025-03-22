
import { Badge } from "@/components/ui/badge";

const CredentialBadges = () => {
  // Credential badge data
  const readyToWorkBadges = [
    "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png", // Career Exploration
    "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png", // Communication
    "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png", // Professionalism
    "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png"  // Florida Soft Skills
  ];
  
  const esbBadge = "/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png";
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h3 className="text-center font-semibold text-blue-800 mb-3">Industry-Recognized Credentials</h3>
      
      <div className="text-center mb-3">
        <Badge variant="brandSolid" className="mb-2">Florida Ready to Work</Badge>
      </div>
      
      <div className="flex justify-center flex-wrap gap-2 mb-4">
        {readyToWorkBadges.map((badge, index) => (
          <div key={index} className="relative w-14 h-14">
            <img 
              src={badge} 
              alt="Ready to Work Badge" 
              className="w-full h-full object-contain rounded-md" 
            />
            <div className="absolute inset-0 bg-blue-400 rounded-md opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
      
      <div className="text-center mb-3">
        <Badge variant="new" className="mb-2">ESB Industry Certification</Badge>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-blue-400 rounded-lg blur-sm opacity-20 animate-pulse"></div>
          <img 
            src={esbBadge} 
            alt="ESB Certification" 
            className="w-full h-full object-contain relative z-10 rounded-md" 
          />
        </div>
      </div>
      
      <p className="text-xs text-center text-blue-700">
        All students enrolled in the Entrepreneurship Academy have access to earn these valuable credentials
      </p>
    </div>
  );
};

export default CredentialBadges;
