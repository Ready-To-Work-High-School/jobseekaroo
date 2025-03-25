
import { useState } from 'react';
import { useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
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
    graduation: "Westside High School, 2023",
    achievements: ["Resume builder tools", "Interview preparation", "Skills assessment"]
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Healthcare Administrative Assistant",
    company: "Jacksonville Memorial Hospital",
    imageUrl: "/lovable-uploads/9902b779-4825-4eca-a738-f4c7384f3331.jpg",
    content: "After completing my certification through the platform, I received three job offers within two weeks. The hospital values my credential and I'm already on track for advancement.",
    graduation: "Westside High School, 2022",
    achievements: ["Healthcare certification", "Job placement", "Career advancement"]
  },
  {
    id: 3,
    name: "Elijah Jones",
    role: "FBLA Officer",
    company: "Westside High School",
    imageUrl: "/lovable-uploads/d455b1eb-c367-4c4c-8797-eeeb18c1898c.png",
    content: "Earning my Florida Ready to Work credentials showcased my proficiency in essential employability skills. As an FBLA officer, I've strengthened my leadership abilities through competitive events and peer collaboration.",
    graduation: "Westside High School, 2025",
    achievements: ["Florida Ready to Work", "Leadership training", "Competition experience"]
  },
  {
    id: 4,
    name: "Ronald King",
    role: "Student Entrepreneur",
    company: "Westside High School",
    imageUrl: "/lovable-uploads/feb3e164-f882-43e2-8086-2739076c1d61.png",
    content: "The Entrepreneurship Academy helped me develop business planning, financial management, and marketing skills. I've gained discipline, persistence, and adaptability—key traits for running a successful business.",
    graduation: "Westside High School, 2025",
    achievements: ["Business planning", "Financial management", "Marketing skills"]
  },
  {
    id: 5,
    name: "Tara Thompson",
    role: "Culinary Arts Student",
    company: "Westside High School",
    imageUrl: "/lovable-uploads/a3167cda-4d5f-4683-bcb7-b533231ec3f1.png",
    content: "The career platform helped me find mentorship opportunities in the culinary field. The resume building tools and interview practice gave me confidence to apply for competitive positions.",
    graduation: "Westside High School, 2024",
    achievements: ["Culinary mentorship", "Resume building", "Interview practice"]
  },
  {
    id: 6,
    name: "Dulce-Luna Flores",
    role: "Healthcare Academy Student",
    company: "Westside High School",
    imageUrl: "/lovable-uploads/1d4f7ca2-2a78-4341-9e73-bd450670eb17.png",
    content: "Through the healthcare academy program, I've gained hands-on clinical experience and certifications that will give me an advantage when applying to nursing school.",
    graduation: "Westside High School, 2024",
    achievements: ["Clinical experience", "Healthcare certifications", "Nursing school prep"]
  },
  {
    id: 7,
    name: "Jordan Wheeler",
    role: "IT Student",
    company: "Westside High School",
    imageUrl: "/lovable-uploads/3948d33f-61a8-4bc4-a88a-ebbeae71c65c.png",
    content: "The IT certification courses prepared me for real-world tech challenges. I've earned multiple credentials that employers value and found mentors who guide my career path.",
    graduation: "Westside High School, 2024",
    achievements: ["IT certifications", "Tech mentorship", "Career guidance"]
  },
  {
    id: 8,
    name: "Jordan Wheeler",
    role: "Welder",
    company: "WW Gay Construction Mechanical Contractors",
    imageUrl: "/lovable-uploads/8eb70332-7245-4c27-910e-cdc668d65e03.png",
    content: "Before graduating from Westside High School, I secured a paid apprenticeship as a welder, thanks to the skills and certifications I gained through the Entrepreneurship Academy. Earning my Industry Certification in Entrepreneurship & Small Business provided me with a strong foundation in business principles, while my Florida Ready to Work credentials demonstrated my proficiency in essential employability and soft skills.",
    graduation: "Westside High School, 2023",
    achievements: ["Welding apprenticeship", "Industry certification", "Business principles"]
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
    <section className={cn("py-16 bg-gradient-to-br from-blue-50 to-slate-100", fadeIn)}>
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
              <div className="md:col-span-1">
                <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl border-4 border-blue-100 shadow-md mb-4">
                  <img 
                    src={activeTestimonial.imageUrl} 
                    alt={activeTestimonial.name} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {activeTestimonial.name}
                </h3>
                <p className="text-sm text-blue-700 font-medium mt-1">
                  {activeTestimonial.role}
                </p>
                <p className="text-sm text-gray-500">
                  {activeTestimonial.company}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {activeTestimonial.graduation}
                </p>
              </div>
              
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <blockquote className="italic text-gray-700 text-lg relative z-10 mb-6">
                    "{activeTestimonial.content}"
                  </blockquote>
                  
                  <div className="mt-4 space-y-2">
                    {activeTestimonial.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start items-center mt-8 space-x-4">
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
