
import React from 'react';

const BrandLogo = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/43c6f0d0-19a6-4f83-86c1-576907c6ed08.png" 
          alt="JS4HS Logo" 
          className="h-48 md:h-56 w-auto object-contain"
          width="400"
          height="400"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23dddddd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='7'%3E%3C/circle%3E%3Cpolyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'%3E%3C/polyline%3E%3C/svg%3E";
          }}
        />
      </div>
      <h2 className="text-3xl font-bold">Job Seekers 4 High Schools</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mt-2 text-lg">
        Connecting students with credential-ready opportunities at Westside High School
      </p>
    </div>
  );
};

export default BrandLogo;
