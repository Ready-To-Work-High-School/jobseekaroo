
import React from 'react';
import { Shield, Award, BadgeCheck, Ribbon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PartnerLogosSection = () => {
  // Credential badge data
  const industryBadges = [{
    id: 1,
    name: "Entrepreneurship & Small Business",
    logo: "/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png",
    isESB: true
  }, {
    id: 2,
    name: "Certified Nursing Assistant",
    logo: "/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.png"
  }, {
    id: 3,
    name: "Microsoft Fundamentals",
    logo: "/lovable-uploads/33a2a707-cb1f-45e1-9f93-bb8816d721e6.png"
  }, {
    id: 4,
    name: "IBM SkillsBuild",
    logo: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png"
  }, {
    id: 5,
    name: "Florida Ready to Work",
    logo: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png"
  }];

  return <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container px-4 mx-auto bg-yellow-50">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BadgeCheck className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-800">Industry-Recognized Credentials</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Students can earn valuable credentials that are recognized and valued by employers
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {industryBadges.map(badge => <div key={badge.id} className="flex flex-col items-center group">
              <div className="relative mb-3">
                {/* Enhanced glow effect with multiple layers and slow pulsating animation */}
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-700 blur-xl animate-pulse-slow"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 to-amber-200 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-md animate-pulse-very-slow"></div>
                <div className="absolute -inset-1 bg-blue-300 rounded-lg opacity-20 group-hover:opacity-80 transition-all duration-500 blur-sm animate-glow-pulse"></div>
                
                <img 
                  src={badge.logo} 
                  alt={`${badge.name} credential`} 
                  className={`relative z-10 transition-transform duration-300 group-hover:scale-110 object-contain ${
                    badge.id === 5 ? 'h-28 w-auto' : 'h-24 w-auto'
                  }`} 
                />
                
                {/* Ribbon-style badge for all credentials */}
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold rounded-sm shadow-md flex items-center gap-1 px-[25px] py-[4px] bg-amber-400">
                    <Ribbon className="h-3 w-3" />
                    {badge.isESB ? 'Industry Certified' : 'Certified'}
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-center max-w-[140px]">{badge.name}</p>
            </div>)}
        </div>
      </div>
    </section>;
};

export default PartnerLogosSection;
