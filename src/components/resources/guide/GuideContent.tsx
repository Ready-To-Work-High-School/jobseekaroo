
import { TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GuideSection } from "./types";
import StepByStepGuide from "./StepByStepGuide";

interface GuideContentProps {
  sections: GuideSection[];
}

const GuideContent = ({ sections }: GuideContentProps) => {
  return (
    <>
      {sections.map((section) => (
        <TabsContent key={section.id} value={section.id} className="space-y-4">
          {section.content.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No results found. Try adjusting your search.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {section.content.map((item, idx) => (
                <AccordionItem key={idx} value={`${section.id}-item-${idx}`} id={`${section.id}-item-${idx}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <StepByStepGuide stepsText={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>
      ))}
    </>
  );
};

export default GuideContent;
