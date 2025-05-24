
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, School, BookOpen, Users, CalendarCheck, GraduationCap, UserCheck, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';

const SchoolGuide = () => {
  const fadeIn = useFadeIn(300);

  const resources = [
    {
      title: 'School Integration Guide',
      description: 'Learn how to integrate our platform with your school systems.',
      icon: School,
      link: '/school-integration'
    },
    {
      title: 'Curriculum Resources',
      description: 'Classroom materials and curriculum guides for teachers.',
      icon: BookOpen,
      link: '/school/resources'
    },
    {
      title: 'Student Progress Tracking',
      description: 'Track student engagement and progress with our analytics tools.',
      icon: Users,
      link: '/school/students'
    },
    {
      title: 'Schedule Career Events',
      description: 'Plan and organize career fairs and employer visits.',
      icon: CalendarCheck,
      link: '/school/events'
    }
  ];

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
    <Layout>
      <Helmet>
        <title>School Guide | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Resources and guides for school administrators and teachers to help students prepare for their first jobs."
        />
      </Helmet>

      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="p-0 mr-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold flex items-center">
              <School className="mr-2" /> School Guide
            </h1>
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">Resources for Educators</h2>
          <p className="text-muted-foreground mb-6">
            Utilize our platform to help your students prepare for the workforce with career guidance, skill development tools, and employer connections.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      {resource.title}
                    </CardTitle>
                    <CardDescription>
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link to={resource.link}>Access Resource</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Exclusive Features Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <ul className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
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
              <Link to="/signup">
                Get Started with Exclusive Access
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="text-center py-8">
          <h3 className="text-xl font-medium mb-4">Need specialized support for your school?</h3>
          <Button size="lg" asChild>
            <Link to="/contact">Contact our Education Team</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolGuide;
