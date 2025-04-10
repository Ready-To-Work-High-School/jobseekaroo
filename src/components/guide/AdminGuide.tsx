
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Filter, Settings } from "lucide-react";

const AdminGuide = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-4">Administrator Guide</h2>
        <p className="text-muted-foreground mb-6">
          Platform administrators have powerful tools to manage users, content, and system settings. This guide explains key features and responsibilities.
        </p>
        
        <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex items-start gap-2 mb-2 text-amber-800 dark:text-amber-300">
            <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">Admin Access Required</h3>
          </div>
          <p className="text-amber-700 dark:text-amber-400">
            This section is for platform administrators only. Admin accounts require special authorization and are subject to security protocols.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button asChild size="lg" className="gap-2">
            <Link to="/admin-dashboard">
              Access Admin Dashboard
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
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>Oversee all platform users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Comprehensive tools for managing platform users:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>View and edit user accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Assign roles and permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verify schools and employers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Generate and manage access codes</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin-user-management">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Filter className="h-5 w-5 text-blue-500" />
              <CardTitle>Content Moderation</CardTitle>
            </div>
            <CardDescription>Ensure platform content quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Tools for maintaining appropriate content:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Review and approve job listings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Moderate messages and communications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Monitor safe platform usage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Maintain compliance standards</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin-message-moderation">Content Moderation</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              <CardTitle>Premium Management</CardTitle>
            </div>
            <CardDescription>Oversee premium features and subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Tools for managing premium services:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Manage subscription tiers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Process premium feature requests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Grant special access permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Review subscription analytics</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin-premium-management">Premium Management</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-5 w-5 text-blue-500" />
              <CardTitle>System Configuration</CardTitle>
            </div>
            <CardDescription>Configure platform settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Controls for customizing the platform:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Configure system-wide settings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Manage security parameters</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Set up automated processes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Define system roles and permissions</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin-dashboard">System Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Administrator Responsibilities</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Data Privacy & Compliance</AccordionTrigger>
            <AccordionContent>
              Administrators are responsible for ensuring platform compliance with data protection regulations including COPPA, FERPA, and other applicable laws. This includes maintaining appropriate data retention policies, responding to data subject requests, and ensuring proper consent management.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>User Safety & Content Moderation</AccordionTrigger>
            <AccordionContent>
              Admins must actively monitor the platform for inappropriate content or behavior, with special attention to protecting minor users. This includes reviewing flagged content, moderating communications, and enforcing community guidelines.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>System Integrity & Security</AccordionTrigger>
            <AccordionContent>
              Maintaining platform security is a critical responsibility, including reviewing access logs, investigating suspicious activities, implementing security updates, and ensuring proper access controls are in place for sensitive features and data.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>User Support & Issue Resolution</AccordionTrigger>
            <AccordionContent>
              Administrators are often the final escalation point for complex user issues, including account verification challenges, employer authenticity concerns, and special accommodation requests. Admins should maintain clear communication channels for reporting issues.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Platform Performance Monitoring</AccordionTrigger>
            <AccordionContent>
              Regular monitoring of platform analytics, user activity patterns, and system performance is essential to identify potential issues early and ensure optimal operation. Admins should review comprehensive analytics dashboards and respond to anomalies.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AdminGuide;
