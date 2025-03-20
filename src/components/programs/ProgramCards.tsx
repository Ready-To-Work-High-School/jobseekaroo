
import React from 'react';
import ProgramCard from './ProgramCard';

const ProgramCards = () => {
  const programs = [
    {
      image: "/lovable-uploads/21bca716-a220-4a1d-a37a-3f6a052d0096.png",
      title: "Entrepreneurship & Small Business",
      description: "Learn the fundamentals of starting and running your own business with the ESB certification program."
    },
    {
      image: "",
      title: "Post-Secondary Readiness",
      description: "Comprehensive programs designed to prepare high school students for college and future careers."
    },
    {
      image: "/lovable-uploads/521bdc87-8068-492d-8a0c-7281a4c42c5a.png",
      title: "Duval Ready Diploma",
      description: "Earn a specialized diploma designation that signals career readiness to future employers."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {programs.map((program, index) => (
        <ProgramCard 
          key={index}
          image={program.image}
          title={program.title}
          description={program.description}
        />
      ))}
    </div>
  );
};

export default ProgramCards;
