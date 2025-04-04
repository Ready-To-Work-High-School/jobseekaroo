
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sofia R.",
      role: "Student, Westside High School",
      image: "/placeholder.svg",
      text: "This platform helped me find my first job that works with my school schedule. The career resources were incredibly helpful!"
    },
    {
      id: 2,
      name: "Michael T.",
      role: "Student, Entrepreneurship Academy",
      image: "/placeholder.svg",
      text: "Thanks to this site, I found an apprenticeship that's teaching me valuable skills while I'm still in high school."
    },
    {
      id: 3,
      name: "Aiden K.",
      role: "Student, Westside High School",
      image: "/placeholder.svg",
      text: "The resume builder and interview tips helped me land a great part-time position at a local tech company."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Students Are Saying</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from high school students who have found valuable opportunities through our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
