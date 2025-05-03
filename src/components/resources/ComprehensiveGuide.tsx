
import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import GuideHeader from './guide/GuideHeader';
import GuideTabs from './guide/GuideTabs';
import GuideContent from './guide/GuideContent';
import DirectoryList from './guide/DirectoryList';
import { guideSections } from './guide/guideData';
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, BookOpen, Shield } from "lucide-react";

const ComprehensiveGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDirectory, setShowDirectory] = useState(false);
  const [activeTabId, setActiveTabId] = useState('getting-started');
  
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
        showDirectory={showDirectory}
        onToggleDirectory={() => setShowDirectory(!showDirectory)}
      />
      
      {/* Guide Introduction */}
      <Card className="mb-8 border-l-4 border-l-blue-500">
        <CardContent className="pt-6">
          <div className="flex gap-3 items-start mb-4">
            <BookOpen className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-medium mb-2">How to use this guide</h2>
              <p className="text-muted-foreground mb-2">
                This comprehensive platform guide is organized into sections accessible through the tabs below. 
                Each section contains expandable questions and answers about different aspects of our platform.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Use the <strong>Directory</strong> button to view a complete list of all topics</li>
                <li>Click on any question to expand its detailed answer</li>
                <li>Use the <strong>Search</strong> box to find specific information across all sections</li>
                <li>Navigate between different categories using the tabs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Compliance Notice */}
      <Card className="mb-8 border-l-4 border-l-green-500">
        <CardContent className="pt-6">
          <div className="flex gap-3 items-start">
            <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-medium mb-2">Privacy & Compliance</h2>
              <p className="text-muted-foreground mb-2">
                We are committed to protecting your privacy and complying with FERPA and other applicable privacy laws.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>All sensitive data is encrypted both in transit and at rest</li>
                <li>Location data access is strictly limited and requires explicit consent</li>
                <li>Student records are protected in accordance with FERPA requirements</li>
                <li>You can review our complete <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips for New Users */}
      <Card className="mb-8 border-l-4 border-l-amber-400">
        <CardContent className="pt-6">
          <div className="flex gap-3 items-start">
            <HelpCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-medium mb-2">New to our platform?</h2>
              <p className="text-muted-foreground">
                We recommend starting with the "Getting Started" section to learn the basics, including 
                account setup, profile setup, and navigation. The "Job Search" and "Applications" sections 
                will help you understand how to find and apply for opportunities while protecting your personal information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showDirectory && (
        <DirectoryList 
          sections={guideSections} 
          activeTabId={activeTabId} 
          setActiveTabId={setActiveTabId}
        />
      )}
      
      <Tabs value={activeTabId} onValueChange={setActiveTabId} className="mb-8">
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
