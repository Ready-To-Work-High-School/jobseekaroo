import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Award, Search, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrialStatsCard from './free-trial/TrialStatsCard';
import TrialTable from './free-trial/TrialTable';
import CreateTrialDialog from './free-trial/CreateTrialDialog';

// Mock data for free trials (keep existing mock data)
const mockTrials = [
  { 
    id: '1', 
    user_email: 'john@example.com',
    user_name: 'John Smith',
    start_date: new Date('2025-03-01'),
    end_date: new Date('2025-04-01'),
    plan_type: 'premium',
    is_active: true,
    converted: false
  },
  { 
    id: '2', 
    user_email: 'emma@company.com',
    user_name: 'Emma Johnson',
    start_date: new Date('2025-02-15'),
    end_date: new Date('2025-03-15'),
    plan_type: 'basic',
    is_active: false,
    converted: true
  },
  { 
    id: '3', 
    user_email: 'michael@school.edu',
    user_name: 'Michael Brown',
    start_date: new Date('2025-03-10'),
    end_date: new Date('2025-04-10'),
    plan_type: 'premium',
    is_active: true,
    converted: false
  }
];

const FreeTrialManager = () => {
  const [trials, setTrials] = useState(mockTrials);
  const [showNewTrialDialog, setShowNewTrialDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [trialEmail, setTrialEmail] = useState('');
  const [trialName, setTrialName] = useState('');
  const [trialPlan, setTrialPlan] = useState('premium');
  const [trialDuration, setTrialDuration] = useState('30');
  const { toast } = useToast();

  // Filter trials based on search query and active tab
  const filteredTrials = trials.filter(trial => {
    const matchesSearch = 
      trial.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.user_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'active' && trial.is_active) ||
      (activeTab === 'expired' && !trial.is_active) ||
      (activeTab === 'converted' && trial.converted);
    
    return matchesSearch && matchesTab;
  });

  const handleCreateTrial = () => {
    if (!trialEmail || !trialName || !trialPlan) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(trialDuration));
    
    const newTrial = {
      id: `trial-${Date.now()}`,
      user_email: trialEmail,
      user_name: trialName,
      start_date: startDate,
      end_date: endDate,
      plan_type: trialPlan,
      is_active: true,
      converted: false
    };
    
    setTrials([newTrial, ...trials]);
    setShowNewTrialDialog(false);
    setTrialEmail('');
    setTrialName('');
    setTrialPlan('premium');
    
    toast({
      title: "Trial created",
      description: `Free trial created for ${trialName}`,
    });
  };

  const handleCancelTrial = (id: string) => {
    setTrials(trials.map(trial => 
      trial.id === id 
        ? { ...trial, is_active: false } 
        : trial
    ));
    
    toast({
      title: "Trial cancelled",
      description: "The free trial has been cancelled",
    });
  };

  const handleConvertTrial = (id: string) => {
    setTrials(trials.map(trial => 
      trial.id === id 
        ? { ...trial, converted: true } 
        : trial
    ));
    
    toast({
      title: "Trial converted",
      description: "User has been converted to a paid subscription",
    });
  };

  const handleExtendTrial = (id: string, days: number) => {
    setTrials(trials.map(trial => {
      if (trial.id === id) {
        const newEndDate = new Date(trial.end_date);
        newEndDate.setDate(newEndDate.getDate() + days);
        return { ...trial, end_date: newEndDate, is_active: true };
      }
      return trial;
    }));
    
    toast({
      title: "Trial extended",
      description: `Trial period extended by ${days} days`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Trials</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="converted">Converted</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9 w-full md:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowNewTrialDialog(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Trial
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Free Trial Management
            </CardTitle>
            <CardDescription>
              Manage free trials, extend periods, and track conversions
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <TrialStatsCard trials={trials} />
            
            <div className="mt-6 border rounded-md overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Plan</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Start Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">End Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <TrialTable 
                    trials={filteredTrials}
                    onExtendTrial={handleExtendTrial}
                    onCancelTrial={handleCancelTrial}
                    onConvertTrial={handleConvertTrial}
                  />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Tabs>

      <CreateTrialDialog
        open={showNewTrialDialog}
        onOpenChange={setShowNewTrialDialog}
        trialEmail={trialEmail}
        setTrialEmail={setTrialEmail}
        trialName={trialName}
        setTrialName={setTrialName}
        trialPlan={trialPlan}
        setTrialPlan={setTrialPlan}
        trialDuration={trialDuration}
        setTrialDuration={setTrialDuration}
        onCreateTrial={handleCreateTrial}
      />
    </div>
  );
};

export default FreeTrialManager;
