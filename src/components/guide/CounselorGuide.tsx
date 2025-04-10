
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Users, BookOpen, FileText, BarChart3 } from "lucide-react";

const CounselorGuide = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-4">Guidance Counselor Guide</h2>
        <p className="text-muted-foreground mb-6">
          As a guidance counselor, you play a vital role in helping students navigate career opportunities. Our platform provides tools to support your work with students.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">Get Started in 4 Simple Steps</h3>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
              <span>Create your counselor account with your school's access code</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
              <span>Generate and distribute student access codes</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
              <span>Set up your monitoring dashboard to track student progress</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
              <span>Access counselor resources and training materials</span>
            </li>
          </ol>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button asChild size="lg" className="gap-2">
            <Link to="/redeem-code">
              Activate Counselor Access
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-blue-500" />
              <CardTitle>Student Management</CardTitle>
            </div>
            <CardDescription>Support your students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Tools to help you guide your students:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>View student profiles and progress</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Generate and manage student access codes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Monitor application activity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verify student skills and achievements</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Student Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <CardTitle>Career Resources</CardTitle>
            </div>
            <CardDescription>Career development tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Access materials to help students with career exploration:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Career assessment tools</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Industry-specific guidance materials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Work-ready curriculum components</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Classroom activities and lesson plans</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/resources">Counselor Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <CardTitle>Student Analytics</CardTitle>
            </div>
            <CardDescription>Track student career development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Insights to help guide student career exploration:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Individual student activity reports</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Skill development tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Application and job search trends</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Custom reports for administration</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <CardTitle>Resume Review</CardTitle>
            </div>
            <CardDescription>Help students build professional resumes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Tools to assist students with resume development:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Access student resume drafts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Provide feedback and suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Share template recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Track resume completion status</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/resume-assistant">Resume Tools</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I get access codes for my students?</AccordionTrigger>
            <AccordionContent>
              Your school administrator can provide you with counselor access, which includes the ability to generate student access codes. Once your account is upgraded to a counselor account, you'll have access to the code generation feature in your dashboard.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I monitor which students are actively using the platform?</AccordionTrigger>
            <AccordionContent>
              Yes, counselors have access to usage analytics that show which students are actively engaged with the platform, what resources they're using, and their progress in job applications. This helps you identify students who might need additional support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I help students who don't know what career to pursue?</AccordionTrigger>
            <AccordionContent>
              Our platform includes career assessment tools and exploration resources that you can assign to students. Additionally, the job simulation feature allows students to virtually experience different career paths before making decisions. You can track their engagement with these tools and discuss the results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I communicate with employers through the platform?</AccordionTrigger>
            <AccordionContent>
              Yes, counselors can connect with verified employers on the platform to discuss potential opportunities for students, arrange job shadowing or group tours, or coordinate school-wide events like job fairs. This feature helps you build relationships with local businesses.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What resources are available to help me use this platform effectively?</AccordionTrigger>
            <AccordionContent>
              We provide comprehensive training resources for counselors, including webinars, video tutorials, and documentation. Our counselor support team is also available to assist with specific questions or challenges you might face when using the platform with your students.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CounselorGuide;
