
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, School, Users, FileText, BarChart3 } from "lucide-react";

const SchoolGuide = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-4">School Guide</h2>
        <p className="text-muted-foreground mb-6">
          Our platform helps schools connect students with valuable work opportunities and provide career readiness tools. Here's how your school can benefit.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">Get Started in 4 Simple Steps</h3>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
              <span>Register your school and verify your administrator status</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
              <span>Generate access codes for students and counselors</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
              <span>Set up school profile and employer partnerships</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
              <span>Access analytics and track student engagement</span>
            </li>
          </ol>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button asChild size="lg" className="gap-2">
            <Link to="/school-landing">
              Register Your School
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <School className="h-5 w-5 text-blue-500" />
              <CardTitle>School Management</CardTitle>
            </div>
            <CardDescription>Administer your school's participation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Comprehensive tools to manage your school's participation:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Bulk student registration tools</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Counselor/teacher account management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Parental consent management system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Customizable permission settings</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/school-landing">School Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-blue-500" />
              <CardTitle>Student Career Development</CardTitle>
            </div>
            <CardDescription>Enhance students' career readiness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Comprehensive career readiness tools for your students:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Curriculum integration resources</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Work-based learning frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Industry credential preparation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Career exploration tools</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/resources">Career Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <CardTitle>Analytics & Reporting</CardTitle>
            </div>
            <CardDescription>Track student outcomes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Comprehensive data to inform your career readiness programs:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Student participation metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Job application and placement rates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Skill development tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Custom reporting for administration</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/school-landing">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <CardTitle>Employer Partnerships</CardTitle>
            </div>
            <CardDescription>Connect with local businesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Develop relationships with employers for student opportunities:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Employer partnership management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Internship program development</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Job fair coordination tools</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Guest speaker scheduling</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/school-landing">Manage Partnerships</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How much does it cost for schools to participate?</AccordionTrigger>
            <AccordionContent>
              We offer a free basic plan for schools with core features, as well as premium options with additional tools and features. Contact our education team for pricing details and to discuss which option would best suit your school's needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do we verify student safety with employers?</AccordionTrigger>
            <AccordionContent>
              All employers on our platform undergo verification before they can post jobs. Schools can also establish preferred employer lists, and our system ensures that all job postings comply with youth labor laws and safety standards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can this platform integrate with our school's existing systems?</AccordionTrigger>
            <AccordionContent>
              Yes, our platform can integrate with common school information systems, career readiness platforms, and learning management systems. Our technical team can work with your IT department to establish appropriate data sharing while maintaining security and privacy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do we handle parental consent?</AccordionTrigger>
            <AccordionContent>
              Our platform includes built-in parental consent management tools that comply with COPPA and other regulations. Schools can choose to use our digital consent forms or integrate with existing parental permission systems.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What training is provided for school staff?</AccordionTrigger>
            <AccordionContent>
              We offer comprehensive training for administrators, counselors, and teachers through live webinars, recorded tutorials, and documentation. Our education success team provides dedicated support for school implementation and ongoing usage.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SchoolGuide;
