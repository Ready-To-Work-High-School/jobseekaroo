
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jessica Wilson',
    role: 'Customer Service Rep',
    company: 'Jacksonville Bank',
    avatar: '/lovable-uploads/9902b779-4825-4eca-a738-f4c7384f3331.jpg',
    testimonial: "Through Job Seekers 4 HS, I landed my first job at Jacksonville Bank. The interview practice made all the difference. I'm now full-time with benefits after starting part-time!",
    badges: ['First Job Success', 'Finance Sector'],
    rating: 5
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'IT Support Specialist',
    company: 'Tech Solutions Inc.',
    avatar: '/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg',
    testimonial: "The platform helped me showcase my tech skills even without work experience. The badge system got me noticed by employers who might have overlooked me otherwise.",
    badges: ['Tech Career', 'Skills Showcase'],
    rating: 5
  },
  {
    id: 3,
    name: 'Taylor Johnson',
    role: 'Office Assistant',
    company: 'Westside Medical',
    avatar: '/lovable-uploads/9babf5b8-1235-48d8-8e19-a555efbf5102.png',
    testimonial: "As a high school student, I wasn't sure how to find part-time work that matched my schedule. This platform made it easy to find flexible opportunities near my school.",
    badges: ['Healthcare', 'Student-Friendly'],
    rating: 4
  }
];

const SuccessStories: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Student Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from high school students who found their first jobs through our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all border-amber-200 h-full flex flex-col">
              <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start mb-4">
                  <Avatar className="h-14 w-14 border-2 border-amber-100">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.role} at {item.company}
                    </p>
                    <div className="flex mt-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative mb-4 flex-grow">
                  <Quote className="h-8 w-8 text-amber-200 absolute -left-1 -top-2 opacity-50" />
                  <blockquote className="pl-6 italic text-gray-700 relative z-10">
                    "{item.testimonial}"
                  </blockquote>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
