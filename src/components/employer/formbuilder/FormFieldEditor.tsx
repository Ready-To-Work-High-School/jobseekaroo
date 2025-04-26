
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, GripVertical } from 'lucide-react';
import { CustomFormField } from '../workflow/types';
import { Textarea } from '@/components/ui/textarea';

interface FormFieldEditorProps {
  field: CustomFormField;
  updateField: (updates: Partial<CustomFormField>) => void;
  removeField: () => void;
  fieldNumber: number;
}

const FormFieldEditor: React.FC<FormFieldEditorProps> = ({
  field,
  updateField,
  removeField,
  fieldNumber
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleTypeChange = (value: string) => {
    const newType = value as CustomFormField['type'];
    updateField({ 
      type: newType, 
      options: ['select', 'radio', 'checkbox'].includes(newType) ? [''] : undefined 
    });
    setShowOptions(['select', 'radio', 'checkbox'].includes(newType));
  };

  const addOption = () => {
    if (!field.options) return;
    updateField({ options: [...field.options, ''] });
  };

  const updateOption = (index: number, value: string) => {
    if (!field.options) return;
    const newOptions = [...field.options];
    newOptions[index] = value;
    updateField({ options: newOptions });
  };

  const removeOption = (index: number) => {
    if (!field.options) return;
    updateField({ options: field.options.filter((_, i) => i !== index) });
  };

  return (
    <Card className="border">
      <CardContent className="pt-6 pb-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {fieldNumber}
            </div>
            <h4 className="font-medium">{field.label || 'New Field'}</h4>
          </div>
          <Button variant="ghost" size="icon" onClick={removeField}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Field Label</label>
            <Input
              value={field.label}
              onChange={(e) => updateField({ label: e.target.value })}
              placeholder="Enter field label"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Field Type</label>
            <Select
              value={field.type}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Input</SelectItem>
                <SelectItem value="textarea">Text Area</SelectItem>
                <SelectItem value="select">Dropdown Select</SelectItem>
                <SelectItem value="radio">Multiple Choice (Radio)</SelectItem>
                <SelectItem value="checkbox">Checkboxes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showOptions && field.options && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Options</label>
            <div className="space-y-2">
              {field.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeOption(index)}>
                    <Minus className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              ))}
              <Button
                onClick={addOption}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                size="sm"
              >
                <Plus className="h-3 w-3" /> Add Option
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Point Value</label>
            <Input
              type="number"
              value={field.pointValue}
              onChange={(e) => updateField({ pointValue: parseInt(e.target.value) || 0 })}
              placeholder="Enter point value"
            />
            <p className="text-xs text-muted-foreground">
              Assign points to evaluate candidate responses
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Field Description</label>
            <Textarea
              value={field.description || ''}
              onChange={(e) => updateField({ description: e.target.value })}
              placeholder="Enter field description or help text"
              rows={2}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={field.required}
            onCheckedChange={(checked) => updateField({ required: checked })}
            id={`required-${field.id}`}
          />
          <label htmlFor={`required-${field.id}`} className="text-sm cursor-pointer">
            Required field
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormFieldEditor;
