
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { GuideSection } from "./types";
import { CheckCircle } from "lucide-react";
import StepByStepGuide from "./StepByStepGuide";

interface GuideContentProps {
  sections: GuideSection[];
}

const GuideContent = ({ sections }: GuideContentProps) => {
  // Function to format feature lists
  const formatFeatureList = (text: string) => {
    if (text.includes("• ")) {
      const [intro, ...listItems] = text.split("• ");
      
      return (
        <>
          <p className="text-muted-foreground mb-3">{intro.trim()}</p>
          <ul className="space-y-2">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">{item.trim()}</span>
              </li>
            ))}
          </ul>
        </>
      );
    }
    
    return <p className="text-muted-foreground">{text}</p>;
  };

  // Function to determine content rendering method
  const renderContent = (text: string) => {
    if (text.includes("Step 1:")) {
      return <StepByStepGuide stepsText={text} />;
    }
    return formatFeatureList(text);
  };

  return (
    <>
      {sections.map(section => (
        <TabsContent key={section.id} value={section.id} className="focus-visible:outline-none focus-visible:ring-0">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {section.content.map((item, index) => (
                <AccordionItem key={index} value={`${section.id}-item-${index}`} id={`${section.id}-item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    {renderContent(item.answer)}
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
