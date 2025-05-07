
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Award, Sparkles, Users, LineChart, Rocket, Crown, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PremiumFeaturesDisplay = () => {
  const features = [
    {
      icon: Crown,
      title: "Branded Job Listings",
      description: "Showcase your brand with custom colors and logos"
    },
    {
      icon: Star,
      title: "Priority Placement",
      description: "Get featured at the top of search results"
    },
    {
      icon: Users,
      title: "Advanced Candidate Search",
      description: "Find the perfect match with powerful filters"
    },
    {
      icon: LineChart,
      title: "Detailed Analytics",
      description: "Track performance with comprehensive insights"
    },
    {
      icon: Award,
      title: "Verified Employer Badge",
      description: "Build trust with verified status"
    },
    {
      icon: Rocket,
      title: "Custom Application Forms",
      description: "Design forms tailored to your needs"
    }
  ];
  
  return (
    <div className="my-10">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Premium Employer Features
            <Sparkles className="h-5 w-5 text-amber-500" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlock powerful tools to enhance your recruiting capabilities and find the perfect candidates faster
          </p>
        </motion.div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full border-blue-100 hover:border-amber-200 hover:shadow-md transition-all">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          asChild 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Link to="/employer-premium" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Explore All Premium Benefits
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PremiumFeaturesDisplay;
