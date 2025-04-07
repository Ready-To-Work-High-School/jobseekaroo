
import React from 'react';

interface ScholarAchievementHeaderProps {
  title: string;
  description: string;
}

const ScholarAchievementHeader = ({ title, description }: ScholarAchievementHeaderProps) => {
  return (
    <>
      {/* Fancy border above High School Scholars Distinction */}
      <div className="mb-8">
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-amber-400"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 px-6 py-2 rounded-full text-white font-bold shadow-md">
              Scholar Achievement
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent font-extrabold mb-4">
          {title}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-950 font-medium">
          {description}
        </p>
      </div>
    </>
  );
};

export default ScholarAchievementHeader;
