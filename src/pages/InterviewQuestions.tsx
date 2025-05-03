
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, MessageSquare, Star, BookOpen, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import StepByStepGuide from '@/components/resources/guide/StepByStepGuide';

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  starred?: boolean;
}

const INTERVIEW_QUESTIONS: Question[] = [
  // Personal Questions
  {
    id: 'q1',
    question: "Tell me about yourself.",
    answer: `<p>This question is your opportunity to make a strong first impression.</p>
    <ul>
      <li>Start with your name and grade/age</li>
      <li>Mention key activities or responsibilities (school clubs, sports, volunteer work)</li>
      <li>Share 1-2 key strengths related to the job</li>
      <li>Explain why you're interested in this position</li>
      <li>Keep it under 60 seconds</li>
    </ul>
    <p><strong>Example:</strong> "I'm Jordan Smith, a junior at Westside High School where I maintain a 3.7 GPA. I'm active in our school's business club and work on the yearbook committee where I've developed strong organizational and time management skills. I'm particularly interested in this position at [Company] because it would allow me to apply my communication skills while learning about retail operations. I'm reliable, quick to learn, and excited about the opportunity to contribute to your team."</p>`,
    category: 'personal',
    difficulty: 'beginner'
  },
  {
    id: 'q2',
    question: "What are your strengths?",
    answer: `<p>When discussing your strengths:</p>
    <ul>
      <li>Choose 2-3 strengths that are relevant to the job</li>
      <li>Provide specific examples that demonstrate each strength</li>
      <li>Connect each strength to how it would benefit the employer</li>
    </ul>
    <p><strong>Example:</strong> "One of my greatest strengths is reliability. My teachers and previous supervisor at the community center could always count on me to complete assignments on time and show up when scheduled. For example, I had perfect attendance at my volunteer position last summer. I believe this reliability would make me a dependable team member who you can count on to show up and do quality work."</p>`,
    category: 'personal',
    difficulty: 'beginner'
  },
  {
    id: 'q3',
    question: "What is your greatest weakness?",
    answer: `<p>This tricky question is testing your self-awareness and growth mindset.</p>
    <ol>
      <li>Choose a genuine weakness that isn't critical to the job</li>
      <li>Explain how you're actively working to improve it</li>
      <li>Share specific steps you've taken to overcome this challenge</li>
    </ol>
    <p><strong>Example:</strong> "One area I'm working to improve is public speaking. While I communicate well in small groups, I sometimes get nervous presenting to larger audiences. To address this, I joined my school's debate club this year to practice speaking in front of groups. I've already noticed improvement in my confidence when giving class presentations. I'm committed to continuing this growth because I understand that clear communication is important in any job."</p>`,
    category: 'personal',
    difficulty: 'intermediate'
  },
  {
    id: 'q4',
    question: "Where do you see yourself in 5 years?",
    answer: `<p>This question helps employers understand your career goals and if their position aligns with your path.</p>
    <ul>
      <li>Be realistic but ambitious</li>
      <li>Show interest in growing with the company if applicable</li>
      <li>Connect your answer to education and career goals</li>
      <li>Demonstrate that you've thought about your future</li>
    </ul>
    <p><strong>Example:</strong> "In five years, I plan to have completed my associate's degree in business administration while gaining practical work experience. I'm interested in learning multiple aspects of retail operations, from customer service to inventory management. Long-term, I hope to grow into a role with more responsibility, perhaps in a supervisory position, where I can use both my education and the skills I've developed on the job."</p>`,
    category: 'personal',
    difficulty: 'intermediate'
  },
  
  // Situational Questions
  {
    id: 'q5',
    question: "How would you handle a dissatisfied customer?",
    answer: `<p>This tests your customer service skills and problem-solving abilities.</p>
    <ol>
      <li>Listen actively to understand their concern without interrupting</li>
      <li>Empathize with their frustration and apologize for their experience</li>
      <li>Ask questions to fully understand the problem</li>
      <li>Offer a solution within your authority</li>
      <li>Involve a manager when necessary</li>
    </ol>
    <p><strong>Example:</strong> "If I encountered a dissatisfied customer, my first priority would be to listen carefully to their concern without interrupting. I would acknowledge their frustration with something like, 'I understand why that would be disappointing.' Then, I'd ask questions to make sure I fully understand the issue. I would try to resolve the problem using the options available to me, and if I couldn't solve it myself, I would politely ask my supervisor for assistance, ensuring the customer feels their concern is being taken seriously throughout the process."</p>`,
    category: 'situational',
    difficulty: 'beginner'
  },
  {
    id: 'q6',
    question: "What would you do if you made a mistake at work?",
    answer: `<p>This question tests your integrity and accountability.</p>
    <ol>
      <li>Take responsibility immediately</li>
      <li>Explain how you would fix the mistake</li>
      <li>Describe what you'd learn from the experience</li>
      <li>Emphasize prevention of similar mistakes in the future</li>
    </ol>
    <p><strong>Example:</strong> "If I made a mistake at work, I would take responsibility for it right away rather than trying to cover it up or blame someone else. I would immediately inform my supervisor about what happened and present a plan to correct the error if possible. For instance, if I made an error on a food order, I would notify my supervisor, apologize to the customer, and ensure they receive the correct order promptly. Afterward, I would reflect on what caused the mistake and create a personal system to prevent it from happening again in the future."</p>`,
    category: 'situational',
    difficulty: 'beginner'
  },
  {
    id: 'q7',
    question: "How would you handle working under pressure or with tight deadlines?",
    answer: `<p>This question assesses your time management and stress management skills.</p>
    <ul>
      <li>Describe your approach to organizing tasks and prioritizing</li>
      <li>Explain techniques you use to stay calm under pressure</li>
      <li>Provide a specific example from school or previous work</li>
      <li>Emphasize your ability to maintain quality while meeting deadlines</li>
    </ul>
    <p><strong>Example:</strong> "When working under pressure, I find that organization is key. I would start by making a list of all tasks and prioritizing them based on urgency and importance. For example, when I had three major assignments due the same week while also working my weekend job, I created a detailed schedule allocating specific times for each task. I also find that taking short breaks helps me stay focused when under pressure. During stressful periods, I make sure to communicate clearly with supervisors about my progress and any potential challenges, which helps ensure everyone's expectations are aligned."</p>`,
    category: 'situational',
    difficulty: 'intermediate'
  },
  
  // Experience Questions
  {
    id: 'q8',
    question: "Tell me about a time you worked as part of a team.",
    answer: `<p>This question evaluates your teamwork and collaboration skills.</p>
    <p>Use the STAR method to structure your answer:</p>
    <ul>
      <li><strong>Situation:</strong> Describe the context</li>
      <li><strong>Task:</strong> Explain your responsibility</li>
      <li><strong>Action:</strong> Detail what you did</li>
      <li><strong>Result:</strong> Share the outcome</li>
    </ul>
    <p><strong>Example:</strong> "Last semester, I was part of a four-person team for our science fair project on water conservation. My specific responsibility was collecting and analyzing data on household water usage in our community. I created a survey, distributed it to 50 households, and then used spreadsheet software to analyze the results. I had to coordinate closely with team members who were researching conservation technologies and designing our presentation. When one team member fell behind due to illness, I helped complete their graphs so we could meet our deadline. Our project won third place at the regional science fair, and our teacher used our research as an example for other classes."</p>`,
    category: 'experience',
    difficulty: 'intermediate'
  },
  {
    id: 'q9',
    question: "Describe a challenge you've faced and how you overcame it.",
    answer: `<p>This question assesses your problem-solving abilities and resilience.</p>
    <ol>
      <li>Choose a relevant challenge you genuinely faced</li>
      <li>Explain the situation briefly but clearly</li>
      <li>Focus more on your actions and solutions than on the problem</li>
      <li>Highlight what you learned from the experience</li>
    </ol>
    <p><strong>Example:</strong> "When I joined the yearbook committee, I discovered that we were significantly behind schedule on gathering student quotes and photos. With only two months before the publishing deadline, I created a digital submission system using Google Forms to collect content more efficiently than the previous paper method. I also organized a 'yearbook booth' during lunch periods where students could quickly contribute their materials. These changes allowed us to collect information from about 85% of the student body in just three weeks, and we submitted our yearbook materials on time. This taught me the value of finding efficient solutions and how technology can streamline processes."</p>`,
    category: 'experience',
    difficulty: 'advanced'
  },
  
  // Job-Specific Questions
  {
    id: 'q10',
    question: "Why do you want to work here?",
    answer: `<p>This question tests if you've researched the company and have genuine interest in the role.</p>
    <ul>
      <li>Research the company before the interview</li>
      <li>Mention specific things about the company that appeal to you</li>
      <li>Connect the job to your skills and career goals</li>
      <li>Show enthusiasm for the company's products, services, or mission</li>
    </ul>
    <p><strong>Example:</strong> "I'm interested in working at Target because I've always appreciated the positive shopping experience as a customer. I've noticed how team members work together to keep the store organized and provide helpful service. I'm particularly impressed by Target's commitment to community involvement and sustainability initiatives. This position would allow me to develop customer service and retail skills in a supportive environment, while the flexible scheduling would work well with my school commitments. I'm excited about the opportunity to contribute to a team that creates such a positive experience for shoppers."</p>`,
    category: 'job-specific',
    difficulty: 'beginner'
  },
  {
    id: 'q11',
    question: "What's your availability?",
    answer: `<p>This practical question helps employers determine if your schedule matches their needs.</p>
    <ul>
      <li>Be honest about when you can and cannot work</li>
      <li>Consider your school schedule, extracurricular activities, and transportation</li>
      <li>Indicate if your availability will change (summer, holidays, etc.)</li>
      <li>Show flexibility if possible, but don't overcommit</li>
    </ul>
    <p><strong>Example:</strong> "During the school year, I'm available to work after 3:30 PM on weekdays and anytime on weekends. I can work up to 15-20 hours per week while maintaining my school responsibilities. During summer and school breaks, I have much more flexibility and could work full-time hours if needed. I have reliable transportation, so getting to and from work won't be an issue. If my schedule needs to change for final exams or special school events, I would provide advance notice."</p>`,
    category: 'job-specific',
    difficulty: 'beginner'
  },
  {
    id: 'q12',
    question: "How would you handle a situation where you need to balance school and work responsibilities?",
    answer: `<p>This question assesses your time management and prioritization skills.</p>
    <ol>
      <li>Emphasize that education remains your top priority</li>
      <li>Explain your system for organizing and planning</li>
      <li>Mention communication with employers about schedule conflicts</li>
      <li>Provide an example of how you've successfully balanced responsibilities</li>
    </ol>
    <p><strong>Example:</strong> "I believe good planning is essential for balancing school and work. I use a digital calendar to track all my commitments, including classes, study time, and work schedules. I make sure to block out adequate time for studying, especially before exams. If I know I have a major school project coming up, I would request fewer hours at work for that week with advance notice. Last semester, I successfully maintained my GPA while volunteering 12 hours weekly at the community center by using these time management strategies. I'm committed to being a reliable employee while ensuring my education doesn't suffer."</p>`,
    category: 'job-specific',
    difficulty: 'intermediate'
  }
];

const InterviewQuestions = () => {
  const [category, setCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [starredQuestions, setStarredQuestions] = useState<string[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(INTERVIEW_QUESTIONS);
  
  useEffect(() => {
    // Filter questions based on category and search term
    let questions = INTERVIEW_QUESTIONS;
    
    if (category !== 'all' && category !== 'starred') {
      questions = questions.filter(q => q.category === category);
    } else if (category === 'starred') {
      questions = questions.filter(q => starredQuestions.includes(q.id));
    }
    
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      questions = questions.filter(q => 
        q.question.toLowerCase().includes(lowercaseSearch) || 
        q.answer.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    setFilteredQuestions(questions);
  }, [category, searchTerm, starredQuestions]);
  
  const toggleStarred = (id: string) => {
    setStarredQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(qId => qId !== id) 
        : [...prev, id]
    );
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Common Interview Questions | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Prepare for your interview with these common questions and sample answers."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="p-0 mr-2">
            <Link to="/interview-prep">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Interview Prep
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Common Interview Questions</h1>
            <p className="text-muted-foreground">Practice answering these frequently asked questions</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="situational">Situational</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="job-specific">Job-Specific</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
          </TabsList>
          
          <TabsContent value={category} className="mt-0">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No questions found</h3>
                <p className="text-muted-foreground">
                  {category === 'starred' 
                    ? "You haven't starred any questions yet." 
                    : "Try adjusting your search or filter criteria."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredQuestions.map((q) => (
                  <Card key={q.id} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          {q.question}
                        </CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2 h-auto"
                          onClick={() => toggleStarred(q.id)}
                        >
                          <Star className={`h-5 w-5 ${starredQuestions.includes(q.id) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                        </Button>
                      </div>
                      <CardDescription>
                        {q.category.charAt(0).toUpperCase() + q.category.slice(1)} | 
                        {q.difficulty === 'beginner' && ' Basic Level'}
                        {q.difficulty === 'intermediate' && ' Intermediate Level'}
                        {q.difficulty === 'advanced' && ' Advanced Level'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <StepByStepGuide stepsText={q.answer} />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 border-t text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Remember to practice your answer out loud
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Card className="mb-8 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-lg">STAR Method for Answering Behavioral Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <span className="font-medium">Situation</span>: Describe the context or background
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <span className="font-medium">Task</span>: Explain what you were responsible for
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <span className="font-medium">Action</span>: Detail the specific steps you took
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <span className="font-medium">Result</span>: Share the outcome and what you learned
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button asChild className="gap-2">
            <Link to="/mock-interview">
              <Video className="h-4 w-4" />
              Practice with Mock Interviews
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewQuestions;
