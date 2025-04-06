
import React from 'react';
import AvatarWithTooltip from '@/components/shared/AvatarWithTooltip';

const RadixDemo = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Radix UI Components Demo</h1>
      
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-xl mb-4">Avatar with Tooltip</h2>
          <div className="flex gap-4">
            <AvatarWithTooltip 
              src="https://github.com/shadcn.png" 
              fallback="CN" 
              tooltipContent="User Profile" 
              alt="User Avatar"
            />
            
            <AvatarWithTooltip 
              fallback="JS" 
              tooltipContent={<span>John Smith <br/> Software Developer</span>} 
            />
            
            <AvatarWithTooltip 
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
              fallback="HS" 
              tooltipContent="High School Jobs Platform" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadixDemo;
