
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Award, 
  Calendar, 
  Clock, 
  PlusCircle, 
  Check, 
  X, 
  Search,
  RefreshCw,
  UserPlus,
  CalendarClock,
  Sparkles,
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for free trials
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

// Mock pricing plans
const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Essential features for new users',
    trial_days: 14,
    features: ['Limited job postings', 'Basic analytics', 'Email support']
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Advanced features for power users',
    trial_days: 30,
    features: ['Unlimited job postings', 'Advanced analytics', 'Priority support', 'Featured listings']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for organizations',
    trial_days: 30,
    features: ['Custom branding', 'API access', 'Dedicated support', 'All premium features']
  }
];

const FreeTrialManager = () => {
  const [trials, setTrials] = useState(mockTrials);
  const [plans, setPlans] = useState(pricingPlans);
  const [showNewTrialDialog, setShowNewTrialDialog] = useState(false);
  const [showEditPlanDialog, setShowEditPlanDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
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

  // Create a new free trial
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

  // Cancel a trial
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

  // Mark trial as converted
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

  // Extend trial period
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

  // Update plan settings
  const handleUpdatePlan = () => {
    if (!selectedPlan) return;
    
    setPlans(plans.map(plan => 
      plan.id === selectedPlan.id 
        ? selectedPlan 
        : plan
    ));
    
    setShowEditPlanDialog(false);
    
    toast({
      title: "Plan updated",
      description: `The ${selectedPlan.name} plan has been updated`,
    });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Calculate remaining days
  const getRemainingDays = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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
            <div className="border rounded-md overflow-x-auto">
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
                  {filteredTrials.map((trial) => (
                    <tr key={trial.id} className="border-t hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium">{trial.user_name}</div>
                          <div className="text-xs text-muted-foreground">{trial.user_email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize">
                        {trial.plan_type}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatDate(trial.start_date)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatDate(trial.end_date)}
                        {trial.is_active && (
                          <div className="text-xs text-muted-foreground">
                            ({getRemainingDays(trial.end_date)} days left)
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {trial.converted ? (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Converted
                          </span>
                        ) : trial.is_active ? (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                            <CalendarClock className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                            <X className="h-3 w-3 mr-1" />
                            Expired
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          {trial.is_active && !trial.converted && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleExtendTrial(trial.id, 7)}
                                title="Extend by 7 days"
                              >
                                +7d
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleConvertTrial(trial.id)}
                              >
                                Convert
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelTrial(trial.id)}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {!trial.is_active && !trial.converted && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleExtendTrial(trial.id, 30)}
                            >
                              Reactivate
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredTrials.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No free trials found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Trial Plan Configuration
          </CardTitle>
          <CardDescription>
            Manage trial period settings and features for each plan
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.id} className="border rounded-md p-4 relative">
                <h3 className="text-lg font-medium mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                
                <div className="flex items-center text-sm mb-4">
                  <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span>{plan.trial_days} day trial</span>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex">
                      <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowEditPlanDialog(true);
                  }}
                >
                  Edit Plan
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Trial Dialog */}
      <Dialog open={showNewTrialDialog} onOpenChange={setShowNewTrialDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Free Trial</DialogTitle>
            <DialogDescription>
              Grant a free trial to a user
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="trial-name">User Name</Label>
              <Input
                id="trial-name"
                value={trialName}
                onChange={(e) => setTrialName(e.target.value)}
                placeholder="Enter user name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trial-email">Email Address</Label>
              <Input
                id="trial-email"
                type="email"
                value={trialEmail}
                onChange={(e) => setTrialEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trial-plan">Trial Plan</Label>
              <Select value={trialPlan} onValueChange={setTrialPlan}>
                <SelectTrigger id="trial-plan">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trial-duration">Trial Duration (Days)</Label>
              <Select value={trialDuration} onValueChange={setTrialDuration}>
                <SelectTrigger id="trial-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="send-email" />
              <Label htmlFor="send-email">Send welcome email</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTrialDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTrial}>
              Create Trial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      {selectedPlan && (
        <Dialog open={showEditPlanDialog} onOpenChange={setShowEditPlanDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {selectedPlan.name} Plan</DialogTitle>
              <DialogDescription>
                Modify trial settings for this pricing plan
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  value={selectedPlan.name}
                  onChange={(e) => setSelectedPlan({...selectedPlan, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plan-description">Description</Label>
                <Input
                  id="plan-description"
                  value={selectedPlan.description}
                  onChange={(e) => setSelectedPlan({...selectedPlan, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plan-trial-days">Trial Period (Days)</Label>
                <Input
                  id="plan-trial-days"
                  type="number"
                  min="1"
                  max="90"
                  value={selectedPlan.trial_days}
                  onChange={(e) => setSelectedPlan({...selectedPlan, trial_days: parseInt(e.target.value) || selectedPlan.trial_days})}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Plan Features</Label>
                {selectedPlan.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const updatedFeatures = [...selectedPlan.features];
                        updatedFeatures[idx] = e.target.value;
                        setSelectedPlan({...selectedPlan, features: updatedFeatures});
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updatedFeatures = selectedPlan.features.filter((_: any, i: number) => i !== idx);
                        setSelectedPlan({...selectedPlan, features: updatedFeatures});
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() => {
                    setSelectedPlan({
                      ...selectedPlan, 
                      features: [...selectedPlan.features, "New feature"]
                    });
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditPlanDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdatePlan}>
                Update Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FreeTrialManager;

// Add missing component
function CalendarClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <circle cx="17" cy="17" r="4" />
      <path d="M17 15v2l1 1" />
    </svg>
  );
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
    </svg>
  );
}
