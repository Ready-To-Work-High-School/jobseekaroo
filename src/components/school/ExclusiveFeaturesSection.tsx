
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, GraduationCap, BookOpen, UserCheck, Shield } from 'lucide-react';

const ExclusiveFeaturesSection = () => {
  const exclusiveFeatures = [
    {
      title: "For High Schools",
      icon: GraduationCap,
      features: [
        "Bulk student account creation and management",
        "Customized school branding and portal",
        "Integration with existing student information systems",
        "Career pathway mapping tools",
        "Employer partnership facilitation"
      ]
    },
    {
      title: "For Teachers",
      icon: BookOpen,
      features: [
        "Classroom assignment integration",
        "Student progress monitoring dashboard",
        "Career education curriculum resources",
        "Real-time engagement analytics",
        "Professional development materials"
      ]
    },
    {
      title: "For Guidance Counselors",
      icon: UserCheck,
      features: [
        "Individual student career counseling tools",
        "College and career readiness assessments",
        "Parent communication portal",
        "Scholarship and opportunity alerts",
        "Post-graduation tracking capabilities"
      ]
    },
    {
      title: "For Administrators",
      icon: Shield,
      features: [
        "District-wide analytics and reporting",
        "Compliance and safety monitoring",
        "Budget and resource allocation tools",
        "Staff training and certification tracking",
        "Community partnership management"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          Exclusive Features for Educational Professionals
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our platform provides specialized tools and features designed specifically for different roles within the educational ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {exclusiveFeatures.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/school-integration">
            Get Started with Exclusive Access
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ExclusiveFeaturesSection;
