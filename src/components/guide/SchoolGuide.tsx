
import { SchoolGuideHeader } from './school/SchoolGuideHeader';
import { SchoolFeatureGrid } from './school/SchoolFeatureGrid';
import { SchoolGuideFAQ } from './school/SchoolGuideFAQ';

const adminFeatures = [
  {
    title: "Bulk Account Management",
    description: "Efficiently create and manage multiple student accounts at once"
  },
  {
    title: "Progress Tracking Dashboard",
    description: "Monitor student engagement and career development progress"
  },
  {
    title: "Branded Portal",
    description: "Customize the platform with your school's colors and logo"
  },
  {
    title: "API Integration",
    description: "Connect with your existing school information systems"
  }
];

const teacherFeatures = [
  {
    title: "Activity Monitoring",
    description: "Track student engagement and progress in real-time"
  },
  {
    title: "Career Pathways",
    description: "Access resources to help guide students' career choices"
  },
  {
    title: "Assignment Integration",
    description: "Seamlessly integrate with classroom assignments"
  },
  {
    title: "Counselor Toolkit",
    description: "Comprehensive tools for guidance counselors"
  }
];

const SchoolGuide = () => {
  return (
    <div className="space-y-8">
      <SchoolGuideHeader />
      
      <div className="max-w-6xl mx-auto px-4">
        <SchoolFeatureGrid 
          title="For School Administrators"
          features={adminFeatures} 
        />
        
        <SchoolFeatureGrid 
          title="For Teachers & Counselors"
          features={teacherFeatures} 
        />
      </div>

      <SchoolGuideFAQ />
    </div>
  );
};

export default SchoolGuide;

