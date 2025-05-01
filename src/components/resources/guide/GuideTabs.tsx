
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuideSection } from "./types";

interface GuideTabsProps {
  sections: GuideSection[];
}

const GuideTabs = ({ sections }: GuideTabsProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
      {sections.map((section) => (
        <TabsTrigger key={section.id} value={section.id} disabled={section.content.length === 0}>
          {section.title}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default GuideTabs;
