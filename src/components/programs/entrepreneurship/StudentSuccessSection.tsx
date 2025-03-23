
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Tara Thompson",
    imageUrl: "/lovable-uploads/36e59658-587d-4ee6-b32e-b81ebde8adec.png",
    content: "I'm amazed by the ways entrepreneurs create amazing innovations from problems. I love Accounting and will apply what I learned to my career goals.",
    year: "Class of 2024"
  },
  {
    id: 2,
    name: "Dulce Luna-Flores",
    imageUrl: "/lovable-uploads/fc414304-b47e-41e7-889b-1c04d9a221ec.png",
    content: "The best part of being in entrepreneurship academy is the way Ms. Coleman keeps us learning new insights and how to become a leader. She prepares us for the real world. I really enjoyed the many traveling opportunities too.",
    year: "Class of 2023"
  },
  {
    id: 3,
    name: "Jordan Wheeler",
    imageUrl: "/lovable-uploads/a226fbf9-a89c-4157-ab94-0bb2e52b807f.png",
    content: "Before graduating from Westside High School, I secured a paid apprenticeship as a welder, thanks to the skills and certifications I gained through the Entrepreneurship Academy. Earning my Industry Certification in Entrepreneurship & Small Business provided me with a strong foundation in business principles, while my Florida Ready to Work credentials demonstrated my proficiency in essential employability and soft skills.",
    year: "Class of 2024"
  },
  {
    id: 4,
    name: "Ronald King",
    imageUrl: "/lovable-uploads/feb3e164-f882-43e2-8086-2739076c1d61.png",
    content: "The Entrepreneurship Academy helped me develop a strong understanding of the foundations of entrepreneurship, including business planning, financial management, and marketing. Through the program, I gained essential soft skills such as discipline, persistence, and adaptability—key traits for navigating the challenges of running a business. This experience has equipped me with the confidence and resilience needed to succeed as a young entrepreneur.",
    year: "Class of 2025"
  }
];

const StudentSuccessSection = () => {
  const fadeIn = useFadeIn(400);
  
  return (
    <section className={cn("py-12 bg-gradient-to-br from-gray-100 to-gray-200", fadeIn)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-red-900 mb-3">Student Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our entrepreneurship academy students about their experiences and accomplishments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-amber-200">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={testimonial.imageUrl} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardContent className="p-5 bg-gradient-to-b from-gray-50 to-gray-200 relative">
                <div className="absolute -top-6 right-4 bg-red-900/10 p-2 rounded-full shadow-md">
                  <Quote className="h-5 w-5 text-red-900" />
                </div>
                <h3 className="font-bold text-lg text-red-900 mb-2">{testimonial.name}</h3>
                <p className="text-sm text-amber-700 mb-3">{testimonial.year}</p>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentSuccessSection;
