
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
    name: "Marcus Williams",
    imageUrl: "/lovable-uploads/d9e85ca7-a9c3-445e-9aa5-468cdcc95775.png",
    content: "Working in the school store gave me real business experience. I learned how to manage inventory, handle transactions, and provide customer service - skills I'm using in my retail management internship.",
    year: "Class of 2023"
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-amber-200">
              <div className="relative h-72 overflow-hidden">
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
