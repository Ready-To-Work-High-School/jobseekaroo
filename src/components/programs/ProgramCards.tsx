
import React from 'react';
import ProgramCard from './ProgramCard';

const ProgramCards = () => {
  const programs = [
    {
      image: "/lovable-uploads/21bca716-a220-4a1d-a37a-3f6a052d0096.png",
      title: "The Westside High School Entrepreneurship School Store was a remarkable success, giving students real-world business experience by managing daily operations, handling finances, and providing customer service. Through running the store and working concessions at events, students gained valuable skills in sales, inventory management, and marketing. They also developed financial literacy by budgeting, tracking profits, and making business decisions. The revenue generated supported the entrepreneurship program and other school initiatives, fostering growth and future expansion plans. This hands-on experience empowered students with practical skills and an entrepreneurial mindset, preparing them for future careers.",
      description: "Learn the fundamentals of starting and running your own business with the ESB certification program. Created by Ms. Coleman, Entrepreneurship Academy.",
      employerBenefits: [
        "Students understand business fundamentals",
        "Candidates with proven initiative and leadership",
        "Experience with project planning and execution"
      ],
      learnMoreLink: "https://certiport.pearsonvue.com/Certifications/ESB/Certification/Overview.aspx"
    },
    {
      image: "/lovable-uploads/e3cddfb1-0795-425f-9b41-401d7156b350.png",
      title: "Post-Secondary Readiness",
      description: "Comprehensive programs designed to prepare high school students for college and future careers.",
      employerBenefits: [
        "Students with advanced training in professional skills",
        "Proven time management and organization abilities",
        "Experience with academic and professional writing"
      ],
      learnMoreLink: "https://www.fbla.org/high-school/"
    },
    {
      image: "/lovable-uploads/521bdc87-8068-492d-8a0c-7281a4c42c5a.png",
      title: "Duval Ready Diploma",
      description: "Earn a specialized diploma designation that signals career readiness to future employers.",
      employerBenefits: [
        "Verified career readiness skills",
        "Students have completed industry-standard training",
        "Experience with real-world workplace scenarios"
      ],
      learnMoreLink: "https://www.floridareadytowork.com/softskills"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 p-2">
      {programs.map((program, index) => (
        <ProgramCard 
          key={index}
          image={program.image}
          title={program.title}
          description={program.description}
          employerBenefits={program.employerBenefits}
          index={index}
          learnMoreLink={program.learnMoreLink}
        />
      ))}
    </div>
  );
};

export default ProgramCards;
