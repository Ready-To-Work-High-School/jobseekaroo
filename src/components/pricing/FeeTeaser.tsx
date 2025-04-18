import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Check, DollarSign, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeeTeaser = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = {
    free: [
      "Basic job posting",
      "Standard visibility",
      "Job title & description",
      "Easy application button",
      "Access to student candidates"
    ],
    premium: [
      "Featured placement in search",
      "Highlighted in job listings",
      "Verified employer badge",
      "30-day free trial available",
      "Analytics dashboard"
    ]
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Badge className="mb-4" variant="outline">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-amber-500" />
            <span>New Freemium Model</span>
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing for Employers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Post jobs for free or upgrade to premium features to increase visibility and find the perfect candidates faster.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Free</h3>
                <p className="text-muted-foreground">Basic job posting</p>
              </div>
              <div className="text-2xl font-bold">$0</div>
            </div>
            
            <ul className="space-y-3 my-6">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild className="w-full" variant="outline">
              <Link to="/employer-dashboard">Post a Free Job</Link>
            </Button>
          </motion.div>
          
          {/* Premium Plan */}
          <motion.div 
            className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl border border-slate-700 shadow-lg p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Diagonal ribbon */}
            <div className="absolute -right-8 top-6 bg-amber-500 text-white text-xs font-bold px-10 py-1 rotate-45">
              FREE TRIAL
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold flex items-center">
                  Premium
                  <Award className="h-4 w-4 ml-2 text-amber-400" />
                </h3>
                <p className="text-slate-300">Enhanced visibility</p>
              </div>
              <div className="text-2xl font-bold">$59</div>
            </div>
            
            <ul className="space-y-3 my-6">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-0">
              <Link to="/employer/premium">Start Free Trial</Link>
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            All employers start with free access. Upgrade anytime to premium features.
            <br />
            <Link to="/pricing" className="text-primary hover:underline">
              View detailed plan comparison
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeeTeaser;
