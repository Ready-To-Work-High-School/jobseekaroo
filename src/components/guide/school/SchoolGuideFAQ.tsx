
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const SchoolGuideFAQ = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How much does it cost for schools to participate?</AccordionTrigger>
          <AccordionContent>
            We offer a free basic plan for schools with core features, as well as premium options with additional tools and features. Contact our education team for pricing details and to discuss which option would best suit your school's needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do we verify student safety with employers?</AccordionTrigger>
          <AccordionContent>
            All employers on our platform undergo verification before they can post jobs. Schools can also establish preferred employer lists, and our system ensures that all job postings comply with youth labor laws and safety standards.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can this platform integrate with our school's existing systems?</AccordionTrigger>
          <AccordionContent>
            Yes, our platform can integrate with common school information systems, career readiness platforms, and learning management systems. Our technical team can work with your IT department to establish appropriate data sharing while maintaining security and privacy.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How do we handle parental consent?</AccordionTrigger>
          <AccordionContent>
            Our platform includes built-in parental consent management tools that comply with COPPA and other regulations. Schools can choose to use our digital consent forms or integrate with existing parental permission systems.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>What training is provided for school staff?</AccordionTrigger>
          <AccordionContent>
            We offer comprehensive training for administrators, counselors, and teachers through live webinars, recorded tutorials, and documentation. Our education success team provides dedicated support for school implementation and ongoing usage.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

