
import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import GuideHeader from './guide/GuideHeader';
import GuideTabs from './guide/GuideTabs';
import GuideContent from './guide/GuideContent';
import { guideSections } from './guide/guideData';

const ComprehensiveGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSections = searchTerm.length > 0 
    ? guideSections.map(section => ({
        ...section,
        content: section.content.filter(item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(section => section.content.length > 0)
    : guideSections;

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <GuideHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <Tabs defaultValue="getting-started" className="mb-8">
        <GuideTabs sections={filteredSections} />
        <GuideContent sections={filteredSections} />
      </Tabs>
      
      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm text-center text-muted-foreground">
          Can't find what you're looking for? Contact our support team at support@jobseekers4hs.com
        </p>
      </div>
    </div>
  );
};

export default ComprehensiveGuide;
