
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileText, Search, Award, BookOpen } from "lucide-react";

const StudentGuide = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-4">Student Guide</h2>
        <p className="text-muted-foreground mb-6">
          Welcome to our platform! As a high school student, you're taking an important step toward your future career. Here's how to make the most of our platform.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">Get Started in 4 Simple Steps</h3>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
              <span>Create your account and complete your profile</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
              <span>Build your resume using our AI-powered tools</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
              <span>Browse job listings and use our matching technology</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
              <span>Apply for positions and track your applications</span>
            </li>
          </ol>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button asChild size="lg" className="gap-2">
            <Link to="/sign-up">
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <CardTitle>Resume Building</CardTitle>
            </div>
            <CardDescription>Create a professional resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Our resume builder is designed specifically for high school students with limited work experience:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Choose from multiple professional templates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>AI suggestions to highlight your skills and accomplishments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Focus on relevant school projects and activities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Export as PDF or share directly with employers</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/resume-assistant">Go to Resume Builder</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Search className="h-5 w-5 text-blue-500" />
              <CardTitle>Job Search</CardTitle>
            </div>
            <CardDescription>Find the right opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Our platform helps you find age-appropriate, entry-level positions:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Filter jobs by location, hours, and job type</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>AI matching based on your skills and interests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Safety-verified employers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Save favorite jobs and set up alerts</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/jobs">Browse Job Listings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-5 w-5 text-blue-500" />
              <CardTitle>Skill Development</CardTitle>
            </div>
            <CardDescription>Earn badges and certifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Enhance your employability with verified skills:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Complete training modules to earn digital badges</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Show employers your verified accomplishments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Track your progress in different skill areas</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/credentials">View Credentials</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <CardTitle>Learning Resources</CardTitle>
            </div>
            <CardDescription>Prepare for the workplace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Access materials to help you succeed in your job search:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Interview preparation guides</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Workplace etiquette training</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Financial literacy modules</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Job simulation experiences</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/resources">Explore Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Do I need my parent's permission to use this platform?</AccordionTrigger>
            <AccordionContent>
              If you're under 16 years old, you'll need parental consent to create an account. Our platform adheres to COPPA regulations, and we provide a simple parental consent process during registration.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I know the jobs are safe and appropriate?</AccordionTrigger>
            <AccordionContent>
              All employers on our platform undergo verification, and we ensure that job listings comply with labor laws for minors. We also provide safety ratings and reviews for employers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What if I don't have any work experience?</AccordionTrigger>
            <AccordionContent>
              Our platform is specifically designed for students with limited or no work experience. We'll help you highlight relevant skills from school projects, volunteer work, and extracurricular activities that demonstrate your capabilities to potential employers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I use this platform if my school isn't participating?</AccordionTrigger>
            <AccordionContent>
              Yes, individual students can sign up even if their school isn't formally participating. However, some features may require a code from a school counselor or administrator. Contact us for alternative verification options.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I track my job applications?</AccordionTrigger>
            <AccordionContent>
              Once you submit applications, you can track their status in your personal dashboard. You'll receive notifications when employers view your application or request an interview, and you can communicate directly through our messaging system.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default StudentGuide;
