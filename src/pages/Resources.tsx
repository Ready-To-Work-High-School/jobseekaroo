
import Layout from '@/components/Layout';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useFadeIn(300);
  const [activeTab, setActiveTab] = useState<'resume' | 'interview' | 'rights'>('resume');
  
  return (
    <Layout>
      <div className={`mb-8 text-center ${headerAnimation}`}>
        <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          Resources
        </span>
        <h1 className="text-4xl font-bold mb-4">Resources for High School Job Seekers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get helpful tips and resources to help you land your first job and succeed in the workplace.
        </p>
      </div>
      
      <div className={`mb-10 flex justify-center ${contentAnimation}`}>
        <div className="inline-flex p-1 bg-secondary rounded-full">
          <TabButton 
            active={activeTab === 'resume'} 
            onClick={() => setActiveTab('resume')}
          >
            Resume Tips
          </TabButton>
          <TabButton 
            active={activeTab === 'interview'} 
            onClick={() => setActiveTab('interview')}
          >
            Interview Prep
          </TabButton>
          <TabButton 
            active={activeTab === 'rights'} 
            onClick={() => setActiveTab('rights')}
          >
            Worker Rights
          </TabButton>
        </div>
      </div>
      
      <div className={contentAnimation}>
        {activeTab === 'resume' && (
          <ResourceContent
            title="Building Your First Resume"
            description="Even with no work experience, you can create a strong resume that showcases your skills and potential."
            image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
                <p className="text-foreground/80 mb-4">
                  Your first resume should highlight your educational achievements, volunteer work, extracurricular 
                  activities, and any relevant skills you've developed in school or in your personal life.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="What to Include"
                  icon="list"
                >
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Contact information (email, phone number)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Education details (GPA, relevant courses, achievements)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Volunteer experience and community service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Extracurricular activities (sports, clubs, leadership roles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Skills (computer, languages, communication, etc.)</span>
                    </li>
                  </ul>
                </ResourceCard>
                
                <ResourceCard
                  title="Resume Tips"
                  icon="lightbulb"
                >
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v8" />
                          <path d="m4.93 10.93 1.41 1.41" />
                          <path d="M2 18h2" />
                          <path d="M20 18h2" />
                          <path d="m19.07 10.93-1.41 1.41" />
                          <path d="M22 22H2" />
                          <path d="m8 22 4-10 4 10" />
                        </svg>
                      </span>
                      <span>Keep it to one page and simple design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v8" />
                          <path d="m4.93 10.93 1.41 1.41" />
                          <path d="M2 18h2" />
                          <path d="M20 18h2" />
                          <path d="m19.07 10.93-1.41 1.41" />
                          <path d="M22 22H2" />
                          <path d="m8 22 4-10 4 10" />
                        </svg>
                      </span>
                      <span>Use action verbs (organized, led, created, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v8" />
                          <path d="m4.93 10.93 1.41 1.41" />
                          <path d="M2 18h2" />
                          <path d="M20 18h2" />
                          <path d="m19.07 10.93-1.41 1.41" />
                          <path d="M22 22H2" />
                          <path d="m8 22 4-10 4 10" />
                        </svg>
                      </span>
                      <span>Tailor it to the job you're applying for</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v8" />
                          <path d="m4.93 10.93 1.41 1.41" />
                          <path d="M2 18h2" />
                          <path d="M20 18h2" />
                          <path d="m19.07 10.93-1.41 1.41" />
                          <path d="M22 22H2" />
                          <path d="m8 22 4-10 4 10" />
                        </svg>
                      </span>
                      <span>Check for spelling and grammar errors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v8" />
                          <path d="m4.93 10.93 1.41 1.41" />
                          <path d="M2 18h2" />
                          <path d="M20 18h2" />
                          <path d="m19.07 10.93-1.41 1.41" />
                          <path d="M22 22H2" />
                          <path d="m8 22 4-10 4 10" />
                        </svg>
                      </span>
                      <span>Have a parent or teacher review it</span>
                    </li>
                  </ul>
                </ResourceCard>
              </div>
              
              <div className="mt-8 bg-secondary/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Resume Template</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Use this simple template as a starting point for your first resume.
                </p>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 focus-ring"
                >
                  Download Template
                </button>
              </div>
            </div>
          </ResourceContent>
        )}
        
        {activeTab === 'interview' && (
          <ResourceContent
            title="Acing Your First Job Interview"
            description="Learn how to prepare for and succeed in your job interviews as a high school student."
            image="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Preparing for Success</h3>
                <p className="text-foreground/80 mb-4">
                  Job interviews can be nerve-wracking, especially if it's your first one. With proper preparation, 
                  you can feel confident and make a great impression.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Before the Interview"
                  icon="clock"
                >
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span>Research the company and position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span>Practice common interview questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span>Prepare questions to ask the interviewer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                      <span>Plan your outfit (business casual is usually appropriate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                      <span>Print extra copies of your resume</span>
                    </li>
                  </ul>
                </ResourceCard>
                
                <ResourceCard
                  title="During the Interview"
                  icon="users"
                >
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span>Arrive 10-15 minutes early</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span>Give a firm handshake and make eye contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span>Speak clearly and confidently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                      <span>Use examples from school or activities to demonstrate skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                      <span>Ask thoughtful questions when given the opportunity</span>
                    </li>
                  </ul>
                </ResourceCard>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold mb-3">Common Interview Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-1">Tell me about yourself.</p>
                    <p className="text-sm text-foreground/70">
                      Focus on your education, interests, and skills relevant to the job. Keep it brief (30-60 seconds).
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Why do you want to work here?</p>
                    <p className="text-sm text-foreground/70">
                      Mention what you like about the company and how the position fits with your goals and interests.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">What are your strengths and weaknesses?</p>
                    <p className="text-sm text-foreground/70">
                      Highlight strengths relevant to the job. For weaknesses, mention something you're working to improve.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">How would you handle a difficult customer?</p>
                    <p className="text-sm text-foreground/70">
                      Explain how you would stay calm, listen, and try to resolve their concern positively.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">What's your availability?</p>
                    <p className="text-sm text-foreground/70">
                      Be honest about your school schedule and other commitments. Highlight your flexibility if applicable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ResourceContent>
        )}
        
        {activeTab === 'rights' && (
          <ResourceContent
            title="Know Your Rights as a Young Worker"
            description="Understand the laws that protect high school students in the workplace."
            image="https://images.unsplash.com/photo-1589391886645-d51c09eb011c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Work Hours and Restrictions</h3>
                <p className="text-foreground/80 mb-4">
                  Federal and state laws limit when and how long teenagers can work, especially during school weeks.
                  These laws are designed to ensure that your job doesn't interfere with your education.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Ages 14-15 Restrictions"
                  icon="clock"
                >
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Not more than 3 hours on a school day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Not more than 18 hours in a school week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Not more than 8 hours on a non-school day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Not more than 40 hours in a non-school week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Work must be between 7am and 7pm (9pm in summer)</span>
                    </li>
                  </ul>
                </ResourceCard>
                
                <ResourceCard
                  title="Ages 16-17 Restrictions"
                  icon="clock"
                >
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>No limit on hours per day or week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Cannot work in hazardous occupations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>State laws may impose additional restrictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>Some states require work permits</span>
                    </li>
                  </ul>
                </ResourceCard>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Minimum Wage and Pay</h3>
                <p className="text-foreground/80 mb-4">
                  Federal law requires that most employees receive at least the federal minimum wage. Some states 
                  and cities have higher minimum wages.
                </p>
                
                <div className="bg-white border border-border rounded-lg p-6">
                  <h4 className="text-lg font-medium mb-3">Important Facts About Your Pay</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9.09 9 .568 6" />
                          <path d="m14.32 9-.55 6" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Youth Minimum Wage</p>
                        <p className="text-sm text-foreground/70">
                          Employers can pay workers under 20 a lower youth minimum wage for the first 90 days of employment.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9.09 9 .568 6" />
                          <path d="m14.32 9-.55 6" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Breaks</p>
                        <p className="text-sm text-foreground/70">
                          Federal law doesn't require breaks, but many states have laws requiring breaks for workers under 18.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9.09 9 .568 6" />
                          <path d="m14.32 9-.55 6" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Tax Withholding</p>
                        <p className="text-sm text-foreground/70">
                          Taxes may be withheld from your paycheck. You may be eligible for a refund when you file taxes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold mb-3 text-primary">Report Violations</h3>
                <p className="text-sm mb-4">
                  If you believe your rights are being violated, contact the U.S. Department of Labor's 
                  Wage and Hour Division or your state's labor department.
                </p>
                <Link 
                  to="https://www.dol.gov/agencies/whd/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 focus-ring inline-block"
                >
                  Contact Department of Labor
                </Link>
              </div>
            </div>
          </ResourceContent>
        )}
      </div>
    </Layout>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ children, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
      active 
        ? "bg-primary text-white" 
        : "bg-transparent text-foreground/70 hover:text-foreground"
    )}
  >
    {children}
  </button>
);

interface ResourceContentProps {
  title: string;
  description: string;
  image: string;
  children: React.ReactNode;
}

const ResourceContent = ({ title, description, image, children }: ResourceContentProps) => (
  <div className="animate-fade-in">
    <div className="relative mb-10 rounded-2xl overflow-hidden h-64">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover" 
      />
      <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/90 max-w-2xl">{description}</p>
      </div>
    </div>
    
    {children}
  </div>
);

interface ResourceCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const ResourceCard = ({ title, icon, children }: ResourceCardProps) => (
  <div className="bg-white border border-border rounded-xl p-6">
    <div className="flex items-center gap-3 mb-4">
      {icon === 'list' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
          </svg>
        </div>
      )}
      {icon === 'lightbulb' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        </div>
      )}
      {icon === 'clock' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      )}
      {icon === 'users' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

export default Resources;
