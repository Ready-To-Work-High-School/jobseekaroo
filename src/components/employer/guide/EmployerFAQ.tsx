
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EmployerFAQ = () => {
  const faqItems = [
    {
      question: "How does the employer verification process work?",
      answer: "Our verification process ensures that all employers are legitimate and suitable for student employment. You'll need to provide business documentation and undergo a brief review process before posting jobs. This typically takes 1-2 business days."
    },
    {
      question: "What types of jobs are appropriate to post?",
      answer: "We welcome entry-level positions suitable for high school students, including part-time work, internships, seasonal positions, and apprenticeships. All jobs must comply with youth labor laws, including appropriate hours and safety considerations."
    },
    {
      question: "Are there fees for posting jobs?",
      answer: "We offer basic free job postings as well as premium options with enhanced visibility and features. Premium employers also receive additional tools like advanced analytics and priority candidate matching."
    },
    {
      question: "How do I know students have the skills they claim?",
      answer: "Our platform includes a verified skills system where students earn badges through assessments and training modules. Additionally, school administrators can verify students' skills and academic achievements, providing you with confidence in their qualifications."
    },
    {
      question: "Can I connect with local schools directly?",
      answer: "Yes, our platform facilitates connections between employers and schools for internship programs, career days, and other collaborations. Premium employers can directly connect with school administrators to develop custom recruitment pipelines."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default EmployerFAQ;
