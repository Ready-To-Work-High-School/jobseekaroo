
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Target, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

const AdaptiveLearning = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const benefits = [
    {
      title: "Personalized Assessment",
      description: "Begin with a comprehensive skill assessment tailored to your career goals.",
      icon: <Target className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Custom Learning Path",
      description: "Receive a learning plan designed for your specific needs and interests.",
      icon: <BookOpen className="h-5 w-5 text-green-500" />
    },
    {
      title: "Interactive Activities",
      description: "Practice with real-world scenarios that build practical skills.",
      icon: <Award className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Progress Tracking",
      description: "Monitor your development and showcase your accomplishments to employers.",
      icon: <ArrowRight className="h-5 w-5 text-amber-500" />
    }
  ];

  const handleStartAssessment = () => {
    if (!user) {
      toast.error("Please sign in to start your assessment", {
        description: "Create an account or sign in to track your progress.",
        action: {
          label: "Sign In",
          onClick: () => navigate("/sign-in")
        }
      });
      return;
    }
    
    navigate("/personalized-assessment");
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-md">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Adaptive Learning Platform</CardTitle>
        <p className="text-muted-foreground mb-0 max-w-3xl mx-auto">
          Build the skills you need for your first job with personalized learning paths and interactive challenges
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/80 hover:bg-white transition-colors">
              <CardContent className="pt-6 text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/skill-development">
              Explore Skills
            </Link>
          </Button>
          <Button onClick={handleStartAssessment}>
            Start Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveLearning;
