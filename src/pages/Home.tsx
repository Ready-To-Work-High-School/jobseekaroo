
import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';
import Hero from '@/components/Hero';
import JobListings from '@/components/JobListings';
import TopEmployersSection from '@/components/job/TopEmployersSection';
import TopJobsSection from '@/components/job/TopJobsSection';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, User, Calendar, Award, Sparkles, TrendingUp, Clock, Star } from 'lucide-react';

const Home = () => {
  const { user, userProfile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta 
          name="description" 
          content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." 
        />
      </Helmet>

      {/* Enhanced Welcome section for authenticated users */}
      {user && (
        <ErrorBoundary>
          <motion.section 
            className="py-12 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 20, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-20 right-20 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                  x: [0, -15, 0],
                  y: [0, 15, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute bottom-10 left-1/3 w-20 h-20 bg-pink-300/15 rounded-full blur-md"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              {/* Welcome header with enhanced animation */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 100 }}
                >
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    👋
                  </motion.span>
                  Welcome back, {userProfile?.first_name || 'there'}!
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-8 w-8 text-yellow-300" />
                  </motion.div>
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Ready to take your career to the next level? ✨
                </motion.p>
              </motion.div>

              {/* Enhanced status cards with better animations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Profile Status Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                  }}
                  className="transform-gpu"
                >
                  <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
                    <CardHeader className="relative z-10 pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <User className="h-5 w-5 text-blue-600" />
                          </motion.div>
                          Your Profile
                        </span>
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Sparkles className="h-4 w-4 text-amber-500" />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <motion.div 
                        className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, duration: 0.4 }}
                      >
                        {userProfile?.first_name ? `Hi, ${userProfile.first_name}! 🚀` : 'Welcome! 🎉'}
                      </motion.div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Your journey starts here
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Account Type Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateX: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                  }}
                  className="transform-gpu"
                >
                  <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50" />
                    <CardHeader className="relative z-10 pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <Award className="h-5 w-5 text-emerald-600" />
                          </motion.div>
                          Your Status
                        </span>
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        >
                          <Star className="h-4 w-4 text-yellow-500" />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <motion.div 
                        className="text-3xl font-bold mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                      >
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {userProfile?.user_type === 'student' ? '🎓 Student' : 
                           userProfile?.user_type === 'employer' ? '💼 Employer' : 
                           userProfile?.user_type === 'admin' ? '⚡ Admin' : '✨ User'}
                        </span>
                      </motion.div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Level: {userProfile?.user_type || 'Getting started'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick Actions Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateZ: 2,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                  }}
                  className="transform-gpu"
                >
                  <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-50" />
                    <CardHeader className="relative z-10 pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 15, -15, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Briefcase className="h-5 w-5 text-orange-600" />
                          </motion.div>
                          Quick Actions
                        </span>
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          ⚡
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-3">
                      {userProfile?.user_type === 'student' ? (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button asChild size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 shadow-lg">
                              <Link to="/jobs" className="flex items-center gap-2">
                                🔍 Find Jobs
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button asChild variant="outline" size="sm" className="w-full border-2 border-purple-200 hover:bg-purple-50">
                              <Link to="/profile" className="flex items-center gap-2">
                                ⚙️ My Profile
                              </Link>
                            </Button>
                          </motion.div>
                        </>
                      ) : userProfile?.user_type === 'employer' ? (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button asChild size="sm" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 shadow-lg">
                              <Link to="/employer-dashboard" className="flex items-center gap-2">
                                📊 Dashboard
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button asChild variant="outline" size="sm" className="w-full border-2 border-emerald-200 hover:bg-emerald-50">
                              <Link to="/post-job" className="flex items-center gap-2">
                                ➕ Post Job
                              </Link>
                            </Button>
                          </motion.div>
                        </>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button asChild size="sm" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 shadow-lg">
                            <Link to="/dashboard" className="flex items-center gap-2">
                              🏠 Dashboard
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </ErrorBoundary>
      )}

      {/* Hero section - show for non-authenticated users or as secondary content */}
      <ErrorBoundary>
        {!user && <Hero />}
      </ErrorBoundary>

      <ErrorBoundary>
        <TopEmployersSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <TopJobsSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <motion.section 
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Job Opportunities</h2>
            <JobListings />
          </div>
        </motion.section>
      </ErrorBoundary>
    </Layout>
  );
};

export default Home;
