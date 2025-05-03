
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, CheckCircle, Circle, FileText, Printer } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  checked: boolean;
}

const InterviewChecklist = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Before the Interview - Days Ahead
    { id: 'research', category: 'before', text: 'Research the company and position', checked: false },
    { id: 'resume', category: 'before', text: 'Print several copies of your resume', checked: false },
    { id: 'outfit', category: 'before', text: 'Choose and prepare a professional outfit', checked: false },
    { id: 'questions', category: 'before', text: 'Prepare answers to common questions', checked: false },
    { id: 'ask', category: 'before', text: 'Prepare questions to ask the interviewer', checked: false },
    { id: 'references', category: 'before', text: 'Prepare a list of references', checked: false },
    { id: 'route', category: 'before', text: 'Plan your route to the interview location', checked: false },
    
    // Day Before the Interview
    { id: 'confirm', category: 'day-before', text: 'Confirm interview time and location', checked: false },
    { id: 'sleep', category: 'day-before', text: 'Get a good night\'s sleep', checked: false },
    { id: 'documents', category: 'day-before', text: 'Gather any required documents or portfolio', checked: false },
    { id: 'bag', category: 'day-before', text: 'Pack your bag with essentials', checked: false },
    { id: 'transport', category: 'day-before', text: 'Arrange transportation', checked: false },
    
    // Day of the Interview
    { id: 'early', category: 'day-of', text: 'Wake up early', checked: false },
    { id: 'breakfast', category: 'day-of', text: 'Eat a nutritious breakfast', checked: false },
    { id: 'hygiene', category: 'day-of', text: 'Maintain proper hygiene', checked: false },
    { id: 'arrival', category: 'day-of', text: 'Arrive 10-15 minutes early', checked: false },
    { id: 'phone', category: 'day-of', text: 'Turn off or silence your phone', checked: false },
    
    // During the Interview
    { id: 'greeting', category: 'during', text: 'Offer a firm handshake and make eye contact', checked: false },
    { id: 'posture', category: 'during', text: 'Maintain good posture throughout', checked: false },
    { id: 'listen', category: 'during', text: 'Listen carefully to questions before answering', checked: false },
    { id: 'speak', category: 'during', text: 'Speak clearly and confidently', checked: false },
    { id: 'star', category: 'during', text: 'Use the STAR method for behavioral questions', checked: false },
    { id: 'askq', category: 'during', text: 'Ask your prepared questions', checked: false },
    { id: 'thanks', category: 'during', text: 'Thank the interviewer for their time', checked: false },
    
    // After the Interview
    { id: 'reflect', category: 'after', text: 'Reflect on the experience and make notes', checked: false },
    { id: 'follow', category: 'after', text: 'Send a thank-you email within 24 hours', checked: false },
    { id: 'next', category: 'after', text: 'Prepare for potential next steps', checked: false },
  ]);

  const toggleChecked = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getProgress = () => {
    const checkedCount = checklistItems.filter(item => item.checked).length;
    const percentage = Math.round((checkedCount / checklistItems.length) * 100);
    return { checkedCount, total: checklistItems.length, percentage };
  };

  const progress = getProgress();
  
  const resetChecklist = () => {
    setChecklistItems(items =>
      items.map(item => ({ ...item, checked: false }))
    );
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <Helmet>
        <title>Interview Checklist | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Complete checklist to prepare for your job interview."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8 print:py-2">
        <div className="flex items-center mb-6 print:hidden">
          <Button variant="ghost" asChild className="p-0 mr-2">
            <Link to="/interview-prep">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Interview Prep
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Interview Checklist</h1>
            <p className="text-muted-foreground">Complete these items for interview success</p>
          </div>
          
          <div className="print:hidden flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={resetChecklist} className="gap-2">
              <Circle className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print Checklist
            </Button>
          </div>
        </div>
        
        <Card className="mb-8 print:shadow-none">
          <CardHeader className="pb-3">
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>
              {progress.checkedCount} of {progress.total} items completed ({progress.percentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          {/* Before the Interview - Days Ahead */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Before the Interview - Days Ahead
              </CardTitle>
              <CardDescription>Preparation in the week leading up to your interview</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklistItems
                  .filter(item => item.category === 'before')
                  .map(item => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="flex items-center h-5 mt-1">
                        <Checkbox 
                          id={item.id} 
                          checked={item.checked} 
                          onCheckedChange={() => toggleChecked(item.id)} 
                        />
                      </div>
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                          item.checked ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item.text}
                      </label>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          {/* Day Before the Interview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                Day Before the Interview
              </CardTitle>
              <CardDescription>Final preparations the day before</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklistItems
                  .filter(item => item.category === 'day-before')
                  .map(item => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="flex items-center h-5 mt-1">
                        <Checkbox 
                          id={item.id} 
                          checked={item.checked} 
                          onCheckedChange={() => toggleChecked(item.id)} 
                        />
                      </div>
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                          item.checked ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item.text}
                      </label>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          {/* Day of the Interview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Day of the Interview
              </CardTitle>
              <CardDescription>Important tasks on interview day</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklistItems
                  .filter(item => item.category === 'day-of')
                  .map(item => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="flex items-center h-5 mt-1">
                        <Checkbox 
                          id={item.id} 
                          checked={item.checked} 
                          onCheckedChange={() => toggleChecked(item.id)} 
                        />
                      </div>
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                          item.checked ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item.text}
                      </label>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          {/* During the Interview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                During the Interview
              </CardTitle>
              <CardDescription>Remember these points during your interview</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklistItems
                  .filter(item => item.category === 'during')
                  .map(item => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="flex items-center h-5 mt-1">
                        <Checkbox 
                          id={item.id} 
                          checked={item.checked} 
                          onCheckedChange={() => toggleChecked(item.id)} 
                        />
                      </div>
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                          item.checked ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item.text}
                      </label>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          {/* After the Interview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                After the Interview
              </CardTitle>
              <CardDescription>Important follow-up steps</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklistItems
                  .filter(item => item.category === 'after')
                  .map(item => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="flex items-center h-5 mt-1">
                        <Checkbox 
                          id={item.id} 
                          checked={item.checked} 
                          onCheckedChange={() => toggleChecked(item.id)} 
                        />
                      </div>
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                          item.checked ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item.text}
                      </label>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center print:hidden">
          <p className="text-sm text-muted-foreground mb-4">
            Complete this checklist to ensure you're fully prepared for your interview!
          </p>
          <Button asChild>
            <Link to="/interview-prep">Back to Interview Resources</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewChecklist;
