
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { WorkflowRule } from './types';
import { Trash2, ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkflowRuleItemProps {
  rule: WorkflowRule;
  updateRule: (rule: Partial<WorkflowRule>) => void;
  removeRule: () => void;
}

const WorkflowRuleItem: React.FC<WorkflowRuleItemProps> = ({ rule, updateRule, removeRule }) => {
  // Update the condition type
  const handleConditionTypeChange = (value: string) => {
    updateRule({
      condition: {
        ...rule.condition,
        type: value as WorkflowRule['condition']['type']
      }
    });
  };

  // Update the condition value
  const handleConditionValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRule({
      condition: {
        ...rule.condition,
        value: e.target.value
      }
    });
  };

  // Update the action type
  const handleActionTypeChange = (value: string) => {
    updateRule({
      action: {
        ...rule.action,
        type: value as WorkflowRule['action']['type'],
        value: ''
      }
    });
  };

  // Update the action value
  const handleActionValueChange = (value: string) => {
    updateRule({
      action: {
        ...rule.action,
        value
      }
    });
  };

  // Toggle rule enabled/disabled
  const toggleRuleEnabled = () => {
    updateRule({ enabled: !rule.enabled });
  };

  const renderConditionValueInput = () => {
    switch (rule.condition.type) {
      case 'candidate_score':
        return (
          <div className="flex items-center gap-2">
            <Select 
              value={rule.condition.comparison || 'greater'} 
              onValueChange={(value) => updateRule({
                condition: { ...rule.condition, comparison: value as any }
              })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Comparison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equal">Equal to</SelectItem>
                <SelectItem value="greater">Greater than</SelectItem>
                <SelectItem value="less">Less than</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              type="number" 
              value={rule.condition.value || ''}
              onChange={handleConditionValueChange}
              placeholder="Points"
              className="w-[120px]"
            />
          </div>
        );
      case 'stage_moved':
        return (
          <Select 
            value={rule.condition.value?.toString() || ''} 
            onValueChange={(value) => updateRule({
              condition: { ...rule.condition, value }
            })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Screening">Screening</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Hired">Hired</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'time_elapsed':
        return (
          <div className="flex items-center gap-2">
            <Input 
              type="number" 
              value={rule.condition.value || ''}
              onChange={handleConditionValueChange}
              placeholder="Days"
              className="w-[120px]"
            />
            <span className="text-muted-foreground">days</span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderActionValueInput = () => {
    switch (rule.action.type) {
      case 'move_to_stage':
        return (
          <Select 
            value={rule.action.value || ''} 
            onValueChange={handleActionValueChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Screening">Screening</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Hired">Hired</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'send_message':
        return (
          <Input 
            type="text" 
            value={rule.action.value || ''}
            onChange={(e) => handleActionValueChange(e.target.value)}
            placeholder="Enter message text"
          />
        );
      case 'assign_tag':
        return (
          <Input 
            type="text" 
            value={rule.action.value || ''}
            onChange={(e) => handleActionValueChange(e.target.value)}
            placeholder="Enter tag name"
          />
        );
      case 'schedule_interview':
        return (
          <Select 
            value={rule.action.value || ''} 
            onValueChange={handleActionValueChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Interview type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone Interview</SelectItem>
              <SelectItem value="video">Video Interview</SelectItem>
              <SelectItem value="in-person">In-Person Interview</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`border ${rule.enabled ? 'border-gray-200' : 'border-gray-200 bg-gray-50'}`}>
      <CardContent className="pt-6 pb-4">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Switch 
                checked={rule.enabled} 
                onCheckedChange={toggleRuleEnabled} 
                id={`rule-enabled-${rule.id}`}
              />
              <Label htmlFor={`rule-enabled-${rule.id}`} className="font-medium cursor-pointer">
                {rule.enabled ? 'Rule Active' : 'Rule Disabled'}
              </Label>
            </div>
            <Button variant="ghost" size="icon" onClick={removeRule}>
              <Trash2 className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>When</Label>
              <Select 
                value={rule.condition.type || 'application_received'} 
                onValueChange={handleConditionTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="application_received">Application is received</SelectItem>
                  <SelectItem value="candidate_score">Candidate score</SelectItem>
                  <SelectItem value="stage_moved">Candidate moves to stage</SelectItem>
                  <SelectItem value="time_elapsed">Time has passed in stage</SelectItem>
                </SelectContent>
              </Select>
              
              {renderConditionValueInput()}
            </div>
            
            <div className="flex items-center justify-center">
              <ArrowRightCircle className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <Label>Then</Label>
              <Select 
                value={rule.action.type || 'move_to_stage'} 
                onValueChange={handleActionTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="move_to_stage">Move to stage</SelectItem>
                  <SelectItem value="send_message">Send message</SelectItem>
                  <SelectItem value="assign_tag">Assign tag</SelectItem>
                  <SelectItem value="schedule_interview">Schedule interview</SelectItem>
                </SelectContent>
              </Select>
              
              {renderActionValueInput()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowRuleItem;
