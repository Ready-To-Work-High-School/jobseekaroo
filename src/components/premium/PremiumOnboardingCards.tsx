
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const PremiumOnboardingCards = () => {
  const cards = [
    {
      title: "Students",
      description: "Access exclusive resources and job opportunities",
      features: [
        "Free for all certified students",
        "Access exclusive job listings",
        "Track your applications",
        "Build your professional profile"
      ],
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      btnVariant: "default",
      link: "/sign-up?type=student"
    },
    {
      title: "Employers",
      description: "Connect with qualified high school talent",
      features: [
        "Post job opportunities",
        "Access verified student profiles",
        "Premium analytics and insights",
        "Onboarding support included"
      ],
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
      textColor: "text-amber-700",
      btnVariant: "outline",
      link: "/employer-onboarding"
    }
  ];

  return (
    <div className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">Get Started With JS4HS</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a student looking for opportunities or an employer seeking qualified talent,
              we have the right tools to help you succeed.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${card.color} border-2 hover:shadow-md transition-shadow`}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {card.icon}
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 shrink-0 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant={card.btnVariant === "default" ? "default" : "outline"} className="w-full gap-1">
                    <Link to={card.link}>
                      {card.title === "Employers" ? "Start Onboarding" : "Get Started"}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumOnboardingCards;
