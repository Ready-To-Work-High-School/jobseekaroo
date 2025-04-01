
import React from 'react';

const PartnerLogosSection = () => {
  // Sample partner logos - replace with actual partner logos
  const partners = [
    { id: 1, name: "Company One", logo: "/placeholder.svg" },
    { id: 2, name: "Company Two", logo: "/placeholder.svg" },
    { id: 3, name: "Company Three", logo: "/placeholder.svg" },
    { id: 4, name: "Company Four", logo: "/placeholder.svg" },
    { id: 5, name: "Company Five", logo: "/placeholder.svg" },
    { id: 6, name: "Company Six", logo: "/placeholder.svg" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">Trusted by Leading Employers</h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map(partner => (
            <div key={partner.id} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
