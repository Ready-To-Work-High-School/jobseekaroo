
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Building, Quote, Star } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { cn } from '@/lib/utils';

const SuccessStories = () => {
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useFadeIn(300);
  
  const stories = [
    {
      name: "Michael Johnson",
      role: "Customer Service Representative",
      company: "Jacksonville Retail Solutions",
      image: null,
      initials: "MJ",
      quote: "The Entrepreneurship Academy gave me the confidence and skills I needed to secure my first job. The resume assistance and interview preparation were invaluable.",
      credentials: ["Customer Service Certification", "Business Fundamentals"],
      color: "bg-blue-500"
    },
    {
      name: "Alisha Rodriguez",
      role: "Administrative Assistant",
      company: "Florida Medical Center",
      image: null,
      initials: "AR",
      quote: "I never thought I could find such a great opportunity while still in high school. The program helped me balance school and work life perfectly.",
      credentials: ["Office Administration", "Communications Skills"],
      color: "bg-amber-500"
    },
    {
      name: "David Thompson",
      role: "Junior Tech Support",
      company: "Tech Solutions Inc.",
      image: "/lovable-uploads/d9e85ca7-a9c3-445e-9aa5-468cdcc95775.png",
      initials: "DT",
      quote: "The technical skills I learned in the program directly translated to my job. My employer was impressed by how prepared I was on day one.",
      credentials: ["Technology Fundamentals", "Entrepreneurship Certification"],
      color: "bg-green-600"
    }
  ];
  
  const employerQuotes = [
    {
      quote: "The students from Westside's Entrepreneurship Academy come prepared with both the technical skills and professional demeanor we look for in our team members.",
      author: "Susan Miller",
      position: "HR Director",
      company: "Jacksonville Business Services"
    },
    {
      quote: "We've hired multiple students from the program and have been consistently impressed with their work ethic and ability to learn quickly.",
      author: "Robert Davis",
      position: "Store Manager",
      company: "Retail Connections"
    }
  ];

  return (
    <Layout>
      <div className={headerAnimation}>
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Student Success Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Westside High School's Entrepreneurship Academy has helped students
            find meaningful employment and start their career journeys.
          </p>
        </div>
      </div>
      
      <div className={contentAnimation}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {stories.map((story, index) => (
            <Card key={index} className="overflow-hidden border-t-4" style={{ borderTopColor: story.color }}>
              <CardHeader className="pb-2 relative">
                <Quote className="absolute right-4 top-4 h-12 w-12 text-slate-100 rotate-180" />
                <CardTitle className="text-xl">{story.name}</CardTitle>
                <CardDescription className="flex flex-col">
                  <span>{story.role}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Building className="h-3 w-3" /> {story.company}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {story.image && (
                  <div className="mb-4 flex justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-200">
                      <img 
                        src={story.image} 
                        alt={story.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                )}
                <p className="text-base italic">"{story.quote}"</p>
              </CardContent>
              <CardFooter className="flex-col items-start border-t pt-4">
                <div className="text-sm font-medium mb-2">Credentials Earned:</div>
                <div className="flex flex-wrap gap-2">
                  {story.credentials.map((cred, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary">
                      {cred}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Separator className="max-w-4xl mx-auto my-16" />
        
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">What Employers Say About Our Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {employerQuotes.map((item, index) => (
              <div key={index} className="p-6 bg-secondary/30 rounded-lg">
                <div className="flex flex-col gap-3">
                  <Quote className="h-10 w-10 text-blue-400/40" />
                  <p className="text-lg font-medium italic mb-4">"{item.quote}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {item.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.author}</p>
                      <p className="text-sm text-muted-foreground">{item.position}, {item.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 rounded-lg mb-8">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Share Your Success Story</h2>
            <p className="mb-6">
              Are you a current or former student who found success through our program?
              We'd love to feature your story to inspire others.
            </p>
            <div className="inline-block">
              <a 
                href="mailto:Colemanp3@duvalschools.org"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-md"
              >
                Submit Your Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStories;
