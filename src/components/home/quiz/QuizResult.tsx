
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RocketIcon, ArrowRight, ChevronRight, Briefcase, GraduationCap, LineChart } from 'lucide-react';
import { CareerPath } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QuizResultProps {
  careerRecommendation: CareerPath | null;
  isAuthenticated: boolean;
  onRestartQuiz: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  careerRecommendation,
  isAuthenticated,
  onRestartQuiz
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-8 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50"
    >
      <RocketIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold mb-4">Your Results Are Ready!</h3>
      {isAuthenticated ? (
        careerRecommendation && (
          <>
            <div className="flex justify-center mb-4">
              {careerRecommendation.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-2">{careerRecommendation.title}</h3>
            <p className="text-muted-foreground mb-6">
              {careerRecommendation.description}
            </p>
            
            <Tabs defaultValue="highlights" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="highlights" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Career Highlights
                </TabsTrigger>
                <TabsTrigger value="steps" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Next Steps
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="highlights" className="text-left">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-lg mb-2">Career Path Highlights:</h4>
                  <ul className="space-y-2">
                    {careerRecommendation.highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="steps" className="text-left">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-lg mb-2">Recommended Next Steps:</h4>
                  <ul className="space-y-2">
                    {careerRecommendation.nextSteps?.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="text-left">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-lg mb-2">Educational Pathways:</h4>
                  <ul className="space-y-3">
                    {careerRecommendation.title === "Tech & Innovation" ? (
                      <>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Computer Science Degree</p>
                            <p className="text-sm text-muted-foreground">4-year bachelor's degree providing comprehensive foundations in computing principles.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Coding Bootcamp</p>
                            <p className="text-sm text-muted-foreground">Intensive 3-6 month program focused on practical programming skills.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Online Certifications</p>
                            <p className="text-sm text-muted-foreground">Self-paced learning through platforms like Coursera, Udemy or freeCodeCamp.</p>
                          </div>
                        </li>
                      </>
                    ) : careerRecommendation.title === "Healthcare & Support" ? (
                      <>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Nursing Program</p>
                            <p className="text-sm text-muted-foreground">2-4 year degree program with clinical rotations and licensure preparation.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Healthcare Administration</p>
                            <p className="text-sm text-muted-foreground">Bachelor's degree in healthcare management or business administration.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Medical Assistant Program</p>
                            <p className="text-sm text-muted-foreground">1-2 year certificate or associate degree program with clinical externships.</p>
                          </div>
                        </li>
                      </>
                    ) : careerRecommendation.title === "Creative & Design" ? (
                      <>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Design School</p>
                            <p className="text-sm text-muted-foreground">Bachelor's degree in graphic design, multimedia or visual communication.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">UX/UI Certificate Programs</p>
                            <p className="text-sm text-muted-foreground">Specialized courses teaching user experience and interface design principles.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Portfolio Development</p>
                            <p className="text-sm text-muted-foreground">Self-directed learning while building a portfolio of creative work.</p>
                          </div>
                        </li>
                      </>
                    ) : careerRecommendation.title === "Business & Leadership" ? (
                      <>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Business Administration Degree</p>
                            <p className="text-sm text-muted-foreground">Bachelor's degree focusing on management, finance, and organizational leadership.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">MBA Program</p>
                            <p className="text-sm text-muted-foreground">Advanced degree for leadership and specialized business knowledge.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Project Management Certification</p>
                            <p className="text-sm text-muted-foreground">Professional certifications like PMP or CAPM for project management skills.</p>
                          </div>
                        </li>
                      </>
                    ) : careerRecommendation.title === "Environmental Sciences" ? (
                      <>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Environmental Science Degree</p>
                            <p className="text-sm text-muted-foreground">Bachelor's degree covering ecology, conservation, and sustainability principles.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Field Research Programs</p>
                            <p className="text-sm text-muted-foreground">Specialized fieldwork training and research experience programs.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Environmental Policy Certificates</p>
                            <p className="text-sm text-muted-foreground">Focused training in environmental regulations and policy development.</p>
                          </div>
                        </li>
                      </>
                    ) : careerRecommendation.title === "Hospitality & Culinary Arts" ? (
                      <>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Culinary School</p>
                            <p className="text-sm text-muted-foreground">Professional culinary training at institutes like CIA or Le Cordon Bleu.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Hospitality Management Degree</p>
                            <p className="text-sm text-muted-foreground">Bachelor's degree covering hotel operations, event planning, and tourism.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Apprenticeships</p>
                            <p className="text-sm text-muted-foreground">Hands-on training under experienced chefs or hotel managers.</p>
                          </div>
                        </li>
                      </>
                    ) : careerRecommendation.title === "Skilled Trades & Construction" ? (
                      <>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Trade School</p>
                            <p className="text-sm text-muted-foreground">Specialized training in electrical, plumbing, HVAC, or other skilled trades.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Apprenticeship Programs</p>
                            <p className="text-sm text-muted-foreground">Paid on-the-job training combined with classroom instruction.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Certifications & Licensure</p>
                            <p className="text-sm text-muted-foreground">Required professional certifications for specific trades and specializations.</p>
                          </div>
                        </li>
                      </>
                    ) : (
                      <li className="flex items-start">
                        <GraduationCap className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Various Education Pathways</p>
                          <p className="text-sm text-muted-foreground">Explore specialized training and education options for this career path.</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <Link 
                to="/jobs" 
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                Browse Related Jobs
              </Link>
              <Link 
                to="/skill-development" 
                className="px-4 py-2 border border-purple-300 dark:border-purple-700 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
              >
                Explore Skills Training
              </Link>
            </div>
          </>
        )
      ) : (
        <div className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mb-4">
            <p className="text-amber-800 dark:text-amber-200">
              Sign in to view your personalized career path recommendation with detailed insights and next steps.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/sign-in" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              Get Detailed Results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
      <div className="mt-6">
        <Button 
          onClick={onRestartQuiz}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
        >
          Take Quiz Again
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizResult;
