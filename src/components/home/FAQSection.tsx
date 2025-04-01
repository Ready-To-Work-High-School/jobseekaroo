
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What types of jobs are available for high school students?",
      answer: "We offer a variety of entry-level positions suitable for high school students, including retail, customer service, food service, office assistance, and more. All jobs are vetted to ensure they're appropriate for students and offer flexible hours."
    },
    {
      question: "How do I create an account?",
      answer: "Simply click on the 'Sign Up' button, enter your email address, create a password, and complete your profile. Make sure to indicate you're a high school student at Westside High School to access student-specific opportunities."
    },
    {
      question: "Are these jobs part-time or full-time?",
      answer: "Most positions are part-time to accommodate school schedules. You can filter job listings by hours per week to find positions that match your availability."
    },
    {
      question: "Do I need prior experience to apply for these jobs?",
      answer: "Most listings are entry-level positions designed specifically for students with little to no work experience. Employers understand they're hiring students and provide necessary training."
    },
    {
      question: "How can employers list jobs on this platform?",
      answer: "Employers can create an account, verify their business information, and post job listings specifically for high school students. We review all listings to ensure they're appropriate and compliant with labor laws for teen workers."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using our platform.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
