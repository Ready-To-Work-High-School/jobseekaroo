
import React from 'react';
import Layout from '@/components/Layout';
import { Star, Sparkles, BriefcaseIcon, ScrollText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';

const PremiumServices = () => {
  const employerSectionRef = useRef(null);
  const schoolSectionRef = useRef(null);
  const isEmployerVisible = useInView(employerSectionRef, { once: true });
  const isSchoolVisible = useInView(schoolSectionRef, { once: true });

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <Star className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold">Premium Services</h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-8"
        >
          Enhanced features for employers and schools, including priority job listings and advanced analytics.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <motion.div 
            ref={employerSectionRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isEmployerVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg border border-blue-100 flex-1 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">For Employers</h2>
              <Badge variant="premium" className="ml-2">MEMBER PERKS</Badge>
            </div>
            <ul className="space-y-4 text-sm mb-6">
              <motion.li 
                className="flex items-start gap-2 p-2 hover:bg-blue-50 rounded-md transition-colors"
                whileHover={{ x: 5 }}
              >
                <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Priority Job Listings</h3>
                  <p className="text-muted-foreground">Get your job postings featured at the top of search results</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 p-2 hover:bg-blue-50 rounded-md transition-colors"
                whileHover={{ x: 5 }}
              >
                <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Advanced Applicant Filtering</h3>
                  <p className="text-muted-foreground">Use sophisticated filters to find the perfect candidates</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 p-2 hover:bg-blue-50 rounded-md transition-colors"
                whileHover={{ x: 5 }}
              >
                <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Detailed Analytics</h3>
                  <p className="text-muted-foreground">Access comprehensive insights about your job postings and applicants</p>
                </div>
              </motion.li>
            </ul>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                <Link to="/employer-premium">Upgrade Now</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            ref={schoolSectionRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isSchoolVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg border border-purple-100 flex-1 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-4">For Schools</h2>
            <ul className="space-y-4 text-sm mb-6">
              <motion.li 
                className="flex items-start gap-2 p-2 hover:bg-purple-50 rounded-md transition-colors"
                whileHover={{ x: 5 }}
              >
                <Sparkles className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Custom Branding</h3>
                  <p className="text-muted-foreground">Personalize the platform with your school's colors and logo</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 p-2 hover:bg-purple-50 rounded-md transition-colors"
                whileHover={{ x: 5 }}
              >
                <Sparkles className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Advanced Reporting</h3>
                  <p className="text-muted-foreground">Generate detailed reports on student engagement and outcomes</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 p-2 hover:bg-purple-50 rounded-md transition-colors"
                whileHover={{ x: 5 }}
              >
                <Sparkles className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">API Integration</h3>
                  <p className="text-muted-foreground">Connect with your existing school systems and databases</p>
                </div>
              </motion.li>
            </ul>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
                <Link to="/school-premium">Get Started</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Dream Job Quiz Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-amber-200 text-amber-900"
          >
            <Link to="/career-quiz">
              <ScrollText className="mr-2 h-5 w-5" />
              What's Your Dream Job? Take the Quiz!
            </Link>
          </Button>
        </motion.div>

        {/* Founding Member Badge Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200"
        >
          <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Founding Member Opportunity
          </h3>
          <p className="text-amber-800">
            The first 50 employers who create an account and post a job will receive an exclusive "Founding Member" badge, 
            showcasing their early support and commitment to student career development.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PremiumServices;
