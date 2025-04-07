
import React from 'react';
import ScholarAchievementHeader from './badges/ScholarAchievementHeader';
import FloridaReadyToWorkStats from './badges/FloridaReadyToWorkStats';
import BadgeGrid from './badges/BadgeGrid';
import EmployerInfoSection from './badges/EmployerInfoSection';

const CredentialsBadges = () => {
  const badges = [{
    image: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png",
    webpImage: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.webp",
    avifImage: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.avif",
    name: "Career Exploration",
    width: 150,
    height: 150
  }, {
    image: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png",
    webpImage: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.webp",
    avifImage: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.avif",
    name: "Communication",
    width: 150,
    height: 150
  }, {
    image: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png",
    webpImage: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.webp",
    avifImage: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.avif",
    name: "Professionalism",
    width: 150,
    height: 150
  }, {
    image: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png",
    webpImage: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.webp",
    avifImage: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.avif",
    name: "Florida Soft Skills",
    width: 150,
    height: 150
  }, {
    image: "/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.png",
    webpImage: "/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.webp",
    avifImage: "/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.avif",
    name: "Team Building",
    width: 150,
    height: 150
  }, {
    image: "/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.png",
    webpImage: "/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.webp",
    avifImage: "/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.avif",
    name: "Capstone Experience",
    width: 150,
    height: 150
  }, {
    image: "/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.png",
    webpImage: "/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.webp",
    avifImage: "/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.avif",
    name: "Problem Solving",
    width: 150,
    height: 150
  }];
  
  return (
    <div className="p-8 rounded-xl shadow-xl border-2 border-blue-200 bg-gradient-to-br from-sky-100 to-blue-100">
      <ScholarAchievementHeader 
        title="High School Scholars Distinction" 
        description="Students may earn highly skilled digital badges, certificates and credentials which showcase career-ready skills, enhanced emerging technology knowledge and industry certification to potential employers" 
      />
      
      <FloridaReadyToWorkStats />
      
      <BadgeGrid badges={badges} />
      
      <EmployerInfoSection />
    </div>
  );
};

export default CredentialsBadges;
