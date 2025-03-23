
import { useState } from 'react';
import { useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Aisha Johnson",
    role: "Software Developer Intern",
    company: "Tech Solutions Inc.",
    imageUrl: "/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg",
    content: "The job platform connected me with my first tech internship! The skills assessments helped me identify my strengths and the mentorship section guided me through interview prep.",
    graduation: "Westside High School, 2023"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Healthcare Administrative Assistant",
    company: "Jacksonville Memorial Hospital",
    imageUrl: "/lovable-uploads/9902b779-4825-4eca-a738-f4c7384f3331.jpg",
    content: "After completing my certification through the platform, I received three job offers within two weeks. The hospital values my credential and I'm already on track for advancement.",
    graduation: "Westside High School, 2022"
  },
  {
    id: 3,
    name: "Jordan Wheeler",
    role: "Professional Welder",
    company: "WW Gay Mechanical Contractors, Inc.",
    imageUrl: "/lovable-uploads/a226fbf9-a89c-4157-ab94-0bb2e52b807f.png",
    content: "Before graduating from Westside High School, I secured a paid apprenticeship as a welder, thanks to the skills and certifications I gained through the Entrepreneurship Academy. Earning my Industry Certification in Entrepreneurship & Small Business provided me with a strong foundation in business principles, while my Florida Ready to Work credentials demonstrated my proficiency in essential employability and soft skills.",
    graduation: "Westside High School, 2024"
  },
  {
    id: 4,
    name: "Ronald King",
    role: "Student Entrepreneur",
    company: "Westside High School",
    imageUrl: "/lovable-uploads/feb3e164-f882-43e2-8086-2739076c1d61.png",
    content: "The Entrepreneurship Academy helped me develop a strong understanding of the foundations of entrepreneurship, including business planning, financial management, and marketing. Through the program, I gained essential soft skills such as discipline, persistence, and adaptability—key traits for navigating the challenges of running a business.",
    graduation: "Westside High School, 2025"
  }
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeIn = useFadeIn(300);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const activeTestimonial = testimonials[activeIndex];
  
  return (
    <section className={cn("py-16 bg-gradient-to-br from-blue-50 to-slate-50", fadeIn)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Student Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from recent graduates who found meaningful careers through our platform
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500">
            <div className="absolute top-4 left-4 text-blue-500 opacity-20">
              <Quote size={60} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-100 shadow-md mb-4">
                  <img 
                    src={activeTestimonial.imageUrl} 
                    alt={activeTestimonial.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  {activeTestimonial.name}
                </h3>
                <p className="text-sm text-blue-700 font-medium text-center mt-1">
                  {activeTestimonial.role}
                </p>
                <p className="text-sm text-gray-500 text-center">
                  {activeTestimonial.company}
                </p>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {activeTestimonial.graduation}
                </p>
              </div>
              
              <div className="md:col-span-2 flex flex-col justify-center">
                <blockquote className="italic text-gray-700 text-lg relative z-10">
                  "{activeTestimonial.content}"
                </blockquote>
                
                <div className="flex justify-center md:justify-start items-center mt-6 space-x-4">
                  <Button 
                    onClick={prevTestimonial} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all duration-300",
                          index === activeIndex 
                            ? "bg-blue-600 scale-125" 
                            : "bg-gray-300 hover:bg-gray-400"
                        )}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    onClick={nextTestimonial} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
