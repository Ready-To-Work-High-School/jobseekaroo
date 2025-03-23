
import { useState } from 'react';
import { useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Quote, Award, GraduationCap } from 'lucide-react';
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
    name: "Jasmine Williams",
    role: "Junior Project Coordinator",
    company: "BuildRight Construction",
    imageUrl: "/lovable-uploads/8c05db9e-7d7f-4a4c-9cfc-18a0cf8ed175.png",
    content: "The apprenticeship connection feature changed my career path! I never considered construction management until seeing the opportunities. Now I'm earning while learning advanced skills.",
    graduation: "Westside High School, 2022"
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
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-md mb-4">
                  <img 
                    src={activeTestimonial.imageUrl} 
                    alt={activeTestimonial.name} 
                    className="w-full h-full object-cover"
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
        
        <div className="mt-12 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Digital Credentials for Student Success</h3>
          <p className="text-gray-700 mb-4">
            As students complete each learning path, they earn digital credentials from leading platforms, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
              <Award className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">IBM</h4>
                <p className="text-sm text-gray-600">Digital badges validating skills in emerging technologies</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
              <GraduationCap className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Everfi</h4>
                <p className="text-sm text-gray-600">Certifications in financial literacy, data science, and workplace skills</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
              <Award className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Florida Ready to Work</h4>
                <p className="text-sm text-gray-600">Four credentials showcasing job readiness and employability skills</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
              <Award className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Industry Certification in ESB</h4>
                <p className="text-sm text-gray-600">Demonstrating expertise in business management and marketing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
