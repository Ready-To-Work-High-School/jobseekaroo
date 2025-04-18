
import { Users, BarChart3, Palette, Wrench } from 'lucide-react';

const AdminFeatures = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Bulk Account Management",
      description: "Efficiently create and manage multiple student accounts at once"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      title: "Progress Tracking Dashboard",
      description: "Monitor student engagement and career development progress"
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: "Branded Portal",
      description: "Customize the platform with your school's colors and logo"
    },
    {
      icon: <Wrench className="w-8 h-8 text-orange-500" />,
      title: "API Integration",
      description: "Connect with your existing school information systems"
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

export default AdminFeatures;
