
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, ArrowRightCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WorkflowRule } from './types';
import WorkflowRuleItem from './WorkflowRuleItem';
import { useAuth } from '@/hooks/useAuth';

const initialRule: WorkflowRule = {
  id: crypto.randomUUID(),
  condition: {
    type: 'application_received'
  },
  action: {
    type: 'move_to_stage',
    value: ''
  },
  enabled: true
};

const WorkflowEditor: React.FC = () => {
  const [rules, setRules] = useState<WorkflowRule[]>([initialRule]);
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const hasPremium = userProfile?.preferences?.hasPremium === true;

  const addNewRule = () => {
    if (!hasPremium && rules.length >= 2) {
      toast({
        title: "Premium Feature",
        description: "Free accounts are limited to 2 workflow rules. Upgrade to create unlimited rules.",
        variant: "destructive"
      });
      return;
    }
    
    setRules([...rules, {
      ...initialRule,
      id: crypto.randomUUID()
    }]);
  };

  const updateRule = (id: string, updatedRule: Partial<WorkflowRule>) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, ...updatedRule } : rule
    ));
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const saveWorkflow = async () => {
    try {
      // Placeholder for API call to save workflow rules
      // await axios.post('/api/employer/workflows', { rules });
      
      toast({
        title: "Workflow Saved",
        description: "Your candidate workflow rules have been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save workflow rules. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Workflow Automation</CardTitle>
        <CardDescription>
          Create automated actions that happen when specific conditions are met
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.map(rule => (
          <WorkflowRuleItem
            key={rule.id}
            rule={rule}
            updateRule={(updatedRule) => updateRule(rule.id, updatedRule)}
            removeRule={() => removeRule(rule.id)}
          />
        ))}
        
        <div className="space-y-4 pt-4">
          <Button 
            onClick={addNewRule} 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Rule
          </Button>
          
          <Button onClick={saveWorkflow} className="w-full">
            Save Workflow
          </Button>
          
          {!hasPremium && (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-md text-sm border border-amber-200">
              <p className="font-medium">Premium Feature</p>
              <p>Free accounts are limited to 2 workflow rules. Upgrade for unlimited rules and advanced conditions.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowEditor;
