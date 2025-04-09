
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Blocks, Briefcase, GraduationCap, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const JobSimulations = () => {
  const fadeIn = useFadeIn(300);

  // Sample simulations data
  const careerPaths = [
    {
      title: "Marketing & Business",
      description: "Learn marketing strategies, business operations and customer analysis.",
      skills: ["Digital Marketing", "Market Research", "Business Strategy", "Customer Analysis"],
      icon: <Briefcase className="h-10 w-10 text-amber-600" />,
      color: "border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100"
    },
    {
      title: "Technology & Software",
      description: "Develop coding skills, learn software design and technical problem-solving.",
      skills: ["Programming", "Software Design", "Product Development", "Testing"],
      icon: <Blocks className="h-10 w-10 text-blue-600" />,
      color: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      title: "Finance & Accounting",
      description: "Learn financial analysis, accounting principles and investment strategies.",
      skills: ["Financial Analysis", "Accounting", "Investment Analysis", "Risk Management"],
      icon: <BookOpen className="h-10 w-10 text-green-600" />,
      color: "border-green-200 bg-gradient-to-br from-green-50 to-green-100"
    }
  ];

  const individualSimulations = [
    {
      title: "Marketing Campaign Development",
      duration: "4 weeks",
      difficulty: "Beginner",
      category: "Marketing"
    },
    {
      title: "Financial Statement Analysis",
      duration: "3 weeks",
      difficulty: "Intermediate",
      category: "Finance"
    },
    {
      title: "Web Application Development",
      duration: "6 weeks",
      difficulty: "Advanced",
      category: "Technology"
    },
    {
      title: "Customer Experience Analysis",
      duration: "2 weeks",
      difficulty: "Beginner",
      category: "Business"
    }
  ];

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-2">Career Development</Badge>
          <h1 className="text-4xl font-bold mb-4">Job Simulations Platform</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gain practical work experience through interactive simulations designed to develop 
            the skills employers are looking for in today's job market.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Choose a Simulation",
                description: "Browse our catalog of career paths or individual job simulations."
              },
              {
                step: 2,
                title: "Complete the Projects",
                description: "Work through realistic tasks and projects at your own pace."
              },
              {
                step: 3,
                title: "Earn a Credential",
                description: "Add your completed simulation credentials to your resume."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                    {item.step}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Paths Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Career Paths</h2>
            <Button variant="outline" size="sm">View All Paths</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerPaths.map((path, index) => (
              <Card key={index} className={`shadow-md hover:shadow-lg transition-shadow ${path.color}`}>
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    {path.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{path.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{path.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-1">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Individual Simulations Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Individual Simulations</h2>
            <Button variant="outline" size="sm">View All Simulations</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {individualSimulations.map((sim, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{sim.category}</Badge>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">{sim.duration}</span>
                      <Badge variant={sim.difficulty === "Beginner" ? "secondary" : 
                              sim.difficulty === "Intermediate" ? "outline" : "default"}>
                        {sim.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{sim.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Practical work experience</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Self-paced learning</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Downloadable certificate</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">Start Simulation</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-blue-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Benefits of Job Simulations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Practical Experience",
                description: "Gain hands-on experience that mimics real workplace scenarios."
              },
              {
                title: "Resume Enhancement",
                description: "Add completed simulations to your resume to stand out."
              },
              {
                title: "Skill Development",
                description: "Develop industry-relevant skills that employers value."
              },
              {
                title: "Career Exploration",
                description: "Try different career paths before committing to one."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-4">
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Career?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start building practical skills today with our interactive job simulations designed 
            to give you the experience employers are looking for.
          </p>
          <Button size="lg">Start Your First Simulation</Button>
        </div>
      </div>
    </Layout>
  );
};

export default JobSimulations;
