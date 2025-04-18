
import { Activity, Compass, Calendar, BookOpen } from 'lucide-react';

const TeacherFeatures = () => {
  const features = [
    {
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      title: "Activity Monitoring",
      description: "Track student engagement and progress in real-time"
    },
    {
      icon: <Compass className="w-8 h-8 text-green-500" />,
      title: "Career Pathways",
      description: "Access resources to help guide students' career choices"
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-500" />,
      title: "Assignment Integration",
      description: "Seamlessly integrate with classroom assignments"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-orange-500" />,
      title: "Counselor Toolkit",
      description: "Comprehensive tools for guidance counselors"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TeacherFeatures;
