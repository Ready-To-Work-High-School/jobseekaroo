
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const InterviewChecklist = () => {
  const checklistItems = [
    {
      category: "Before the Interview",
      icon: Clock,
      items: [
        "Research the company and position",
        "Review your resume and application",
        "Prepare answers to common questions",
        "Plan your outfit (professional attire)",
        "Test your technology (for virtual interviews)",
        "Plan your route and arrive 10-15 minutes early",
        "Prepare questions to ask the interviewer"
      ]
    },
    {
      category: "Documents to Bring",
      icon: FileText,
      items: [
        "Multiple copies of your resume",
        "References list (if requested)",
        "Work samples or portfolio",
        "Valid ID",
        "Notepad and pen",
        "Any certificates or awards"
      ]
    },
    {
      category: "During the Interview",
      icon: Users,
      items: [
        "Arrive on time",
        "Turn off your phone",
        "Make eye contact and smile",
        "Listen carefully to questions",
        "Ask thoughtful questions",
        "Take notes if appropriate",
        "Thank the interviewer"
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Interview Checklist | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Complete interview preparation checklist to help you succeed in your job interviews."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="p-0 mr-2">
              <Link to="/interview-prep">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Interview Prep
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Interview Checklist</h1>
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-2">Be Prepared for Success</h2>
          <p className="text-muted-foreground">
            Use this comprehensive checklist to ensure you're fully prepared for your interview. 
            Check off each item as you complete it to build confidence and reduce anxiety.
          </p>
        </div>

        <div className="grid gap-6">
          {checklistItems.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <Card key={sectionIndex} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-semibold mb-4">Ready for More Practice?</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/interview-questions">Practice Questions</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/mock-interview">Mock Interview</Link>
              </Button>
              <Button asChild>
                <Link to="/interview-prep">Back to Interview Prep</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewChecklist;
