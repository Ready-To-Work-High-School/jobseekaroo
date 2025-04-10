
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Briefcase, Users, BarChart3, Shield } from "lucide-react";

const EmployerGuide = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-4">Employer Guide</h2>
        <p className="text-muted-foreground mb-6">
          Our platform connects you with motivated high school students ready to contribute to your business. Here's how to effectively use our employer tools.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">Get Started in 4 Simple Steps</h3>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
              <span>Create an employer account and complete verification</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
              <span>Post job opportunities tailored for entry-level candidates</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
              <span>Review applications and use AI matching to find qualified candidates</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
              <span>Schedule interviews and manage the hiring process</span>
            </li>
          </ol>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button asChild size="lg" className="gap-2">
            <Link to="/employer-dashboard">
              Access Employer Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              <CardTitle>Job Postings</CardTitle>
            </div>
            <CardDescription>Create effective listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Our platform makes it easy to post jobs appropriate for high school students:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Templates designed for entry-level positions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Guidance on youth labor compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Premium placement options for increased visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Set required skills and qualifications</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/employer-dashboard">Create Job Posting</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-blue-500" />
              <CardTitle>Candidate Management</CardTitle>
            </div>
            <CardDescription>Find the right talent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Efficiently review and manage applicants:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>AI-powered skill matching technology</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verified skills and credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Streamlined communication with candidates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Application status tracking</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/employer-dashboard">Manage Candidates</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <CardTitle>Analytics Dashboard</CardTitle>
            </div>
            <CardDescription>Measure recruitment performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Gain valuable insights into your recruitment efforts:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>View job posting performance metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Track applicant sources and conversion rates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Compare hiring efficiency over time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Premium reports and insights</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/employer/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <CardTitle>Compliance & Best Practices</CardTitle>
            </div>
            <CardDescription>Ensuring proper youth employment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We help you navigate the requirements of employing young workers:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Guidance on youth labor laws</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Work permit requirements by location</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Best practices for managing young employees</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Mentorship program guidance</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/resources">Compliance Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the employer verification process work?</AccordionTrigger>
            <AccordionContent>
              Our verification process ensures that all employers are legitimate and suitable for student employment. You'll need to provide business documentation and undergo a brief review process before posting jobs. This typically takes 1-2 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What types of jobs are appropriate to post?</AccordionTrigger>
            <AccordionContent>
              We welcome entry-level positions suitable for high school students, including part-time work, internships, seasonal positions, and apprenticeships. All jobs must comply with youth labor laws, including appropriate hours and safety considerations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Are there fees for posting jobs?</AccordionTrigger>
            <AccordionContent>
              We offer basic free job postings as well as premium options with enhanced visibility and features. Premium employers also receive additional tools like advanced analytics and priority candidate matching.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I know students have the skills they claim?</AccordionTrigger>
            <AccordionContent>
              Our platform includes a verified skills system where students earn badges through assessments and training modules. Additionally, school administrators can verify students' skills and academic achievements, providing you with confidence in their qualifications.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I connect with local schools directly?</AccordionTrigger>
            <AccordionContent>
              Yes, our platform facilitates connections between employers and schools for internship programs, career days, and other collaborations. Premium employers can directly connect with school administrators to develop custom recruitment pipelines.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default EmployerGuide;
