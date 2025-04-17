import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Blocks, Briefcase, GraduationCap, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getJobSimulations, getUserSimulationProgress, startSimulation } from '@/lib/supabase/simulations';
import { JobSimulation } from '@/types/jobSimulation';

const mockSimulations: JobSimulation[] = [
  {
    id: "sim-001",
    title: "Customer Service Representative",
    description: "Experience what it's like to work in a customer service role, handling inquiries and resolving issues.",
    category: "retail",
    difficulty: "Beginner",
    duration: "45 minutes",
    thumbnail_url: "",
    requirements: ["Communication skills", "Problem solving"],
    skills_gained: ["Customer service", "Conflict resolution", "Time management"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sim-002",
    title: "Administrative Assistant",
    description: "Learn essential office skills through realistic scenarios in an office environment.",
    category: "office",
    difficulty: "Beginner",
    duration: "60 minutes",
    thumbnail_url: "",
    requirements: ["Basic computer skills", "Organization"],
    skills_gained: ["Email management", "Scheduling", "Document processing"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sim-003",
    title: "Retail Sales Associate",
    description: "Practice helping customers find products, processing transactions, and managing inventory.",
    category: "retail",
    difficulty: "Beginner",
    duration: "40 minutes",
    thumbnail_url: "",
    requirements: ["Communication skills", "Basic math"],
    skills_gained: ["Sales techniques", "Point of sale systems", "Inventory management"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sim-004",
    title: "Healthcare Assistant",
    description: "Experience patient interaction scenarios and basic healthcare procedures.",
    category: "healthcare",
    difficulty: "Intermediate",
    duration: "75 minutes",
    thumbnail_url: "",
    requirements: ["Interest in healthcare", "Attention to detail"],
    skills_gained: ["Patient care", "Medical terminology", "Record keeping"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const JobSimulations = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [useMockData, setUseMockData] = useState<boolean>(false);

  // Fetch all job simulations
  const { data: fetchedSimulations, isLoading } = useQuery({
    queryKey: ['jobSimulations'],
    queryFn: getJobSimulations,
    meta: {
      onError: (error: any) => {
        console.error("Error fetching simulations:", error);
        setUseMockData(true);
      }
    },
    onSuccess: (data) => {
      if (!data || data.length === 0) {
        console.log("No simulations found in database, using mock data");
        setUseMockData(true);
      }
    }
  });

  // Use mock data if no simulations are returned from the database
  const simulations = useMockData ? mockSimulations : fetchedSimulations;

  // Handle starting a simulation
  const handleStartSimulation = async (simulation: JobSimulation) => {
    if (!user) {
      toast.error("Please sign in to start a simulation", {
        description: "You need to be signed in to track your progress"
      });
      return;
    }
    
    try {
      if (useMockData) {
        // For mock data, just navigate without actual DB interaction
        toast.success(`Started: ${simulation.title}`, {
          description: "Your progress will be saved automatically"
        });
        navigate(`/job-simulations/${simulation.id}`);
      } else {
        await startSimulation(user.id, simulation.id);
        toast.success(`Started: ${simulation.title}`, {
          description: "Your progress will be saved automatically"
        });
        navigate(`/job-simulations/${simulation.id}`);
      }
    } catch (error) {
      console.error("Error starting simulation:", error);
      toast.error("Failed to start simulation", {
        description: "Please try again later"
      });
    }
  };

  // Filter simulations by category
  const filteredSimulations = selectedCategory === 'all' 
    ? simulations 
    : simulations?.filter(sim => sim.category === selectedCategory);

  // Get unique categories
  const categories = simulations 
    ? ['all', ...new Set(simulations.map(sim => sim.category))]
    : ['all'];

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

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer text-sm py-1 px-3 capitalize"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Individual Simulations Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Available Simulations</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredSimulations && filteredSimulations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSimulations.map((simulation) => (
                <Card key={simulation.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="capitalize">{simulation.category}</Badge>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">{simulation.duration}</span>
                        <Badge variant={simulation.difficulty === "Beginner" ? "secondary" : 
                                simulation.difficulty === "Intermediate" ? "outline" : "default"}>
                          {simulation.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="mt-2">{simulation.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{simulation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold mb-1">Skills you'll gain:</h4>
                      <div className="flex flex-wrap gap-1">
                        {simulation.skills_gained.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Practical work experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Self-paced learning</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Downloadable certificate</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => handleStartSimulation(simulation)}
                    >
                      Start Simulation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Briefcase className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No simulations found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any simulations for the selected category.
              </p>
              <Button 
                variant="outline"
                onClick={() => setSelectedCategory('all')}
              >
                View All Simulations
              </Button>
            </div>
          )}
        </div>

        {/* Skill Development Section */}
        <div className="bg-blue-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">Adaptive Learning Platform</h2>
          <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
            Our skill development platform uses adaptive learning technology to identify your strengths and areas for improvement. 
            Based on your career interests and existing skillset, we create a customized learning journey to help you build the 
            competencies employers are looking for.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Personalized Assessment",
                description: "Begin with a comprehensive skill assessment tailored to your career goals."
              },
              {
                title: "Custom Learning Path",
                description: "Receive a learning plan designed for your specific needs and interests."
              },
              {
                title: "Interactive Activities",
                description: "Practice with real-world scenarios that build practical skills."
              },
              {
                title: "Progress Tracking",
                description: "Monitor your development and showcase your accomplishments to employers."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-4">
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/skill-development">
                Explore Skill Development
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Career?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start building practical skills today with our interactive job simulations designed 
            to give you the experience employers are looking for.
          </p>
          <Button 
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Explore All Simulations
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default JobSimulations;
