
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuideSection } from "./types";

interface GuideTabsProps {
  sections: GuideSection[];
}

const GuideTabs = ({ sections }: GuideTabsProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <TabsList className="inline-flex w-full mb-6 overflow-x-auto pb-2 justify-start">
        {sections.map(section => (
          <TabsTrigger key={section.id} value={section.id} className="whitespace-nowrap">
            {section.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </ScrollArea>
  );
};

export default GuideTabs;
