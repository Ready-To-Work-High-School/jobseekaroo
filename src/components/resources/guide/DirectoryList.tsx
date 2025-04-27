
import { Card } from "@/components/ui/card";
import { GuideSection } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface DirectoryListProps {
  sections: GuideSection[];
}

const DirectoryList = ({ sections }: DirectoryListProps) => {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Guide Directory</h2>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-1 ml-2">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`#${section.id}-item-${idx}`}
                      className="hover:text-primary hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(`${section.id}-item-${idx}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          setTimeout(() => {
                            const button = element.querySelector('[data-state="closed"]');
                            if (button) (button as HTMLElement).click();
                          }, 500);
                        }
                      }}
                    >
                      {item.question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default DirectoryList;
