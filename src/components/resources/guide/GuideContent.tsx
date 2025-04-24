
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { GuideSection } from "./types";

interface GuideContentProps {
  sections: GuideSection[];
}

const GuideContent = ({ sections }: GuideContentProps) => {
  return (
    <>
      {sections.map(section => (
        <TabsContent key={section.id} value={section.id} className="focus-visible:outline-none focus-visible:ring-0">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {section.content.map((item, index) => (
                <AccordionItem key={index} value={`${section.id}-item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>
      ))}
    </>
  );
};

export default GuideContent;
