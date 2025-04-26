
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CustomForm, CustomFormField } from '../workflow/types';
import FormFieldEditor from './FormFieldEditor';
import { useAuth } from '@/hooks/useAuth';

const initialFormField: CustomFormField = {
  id: crypto.randomUUID(),
  label: '',
  type: 'text',
  required: false,
  pointValue: 0
};

const initialForm: CustomForm = {
  id: crypto.randomUUID(),
  title: 'Candidate Assessment Form',
  description: 'Use this form to evaluate candidates',
  fields: [initialFormField]
};

const FormBuilder: React.FC = () => {
  const [form, setForm] = useState<CustomForm>(initialForm);
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const hasPremium = userProfile?.preferences?.hasPremium === true;

  const updateForm = (updates: Partial<CustomForm>) => {
    setForm({ ...form, ...updates });
  };

  const addField = () => {
    if (!hasPremium && form.fields.length >= 3) {
      toast({
        title: "Premium Feature",
        description: "Free accounts are limited to 3 form fields. Upgrade to create unlimited fields.",
        variant: "destructive"
      });
      return;
    }

    setForm({
      ...form,
      fields: [...form.fields, { ...initialFormField, id: crypto.randomUUID() }]
    });
  };

  const updateField = (id: string, updates: Partial<CustomFormField>) => {
    setForm({
      ...form,
      fields: form.fields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    });
  };

  const removeField = (id: string) => {
    setForm({
      ...form,
      fields: form.fields.filter(field => field.id !== id)
    });
  };

  const saveForm = async () => {
    try {
      // Placeholder for API call to save form
      // await axios.post('/api/employer/forms', form);
      
      toast({
        title: "Form Saved",
        description: "Your custom form has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Form Builder</CardTitle>
        <CardDescription>
          Create custom assessment forms for candidates with point values
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-medium">Form Title</label>
            <Input 
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
              placeholder="Enter form title"
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-medium">Description</label>
            <Textarea 
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
              placeholder="Enter form description"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Form Fields</h3>
          
          {form.fields.map((field, index) => (
            <FormFieldEditor
              key={field.id}
              field={field}
              updateField={(updates) => updateField(field.id, updates)}
              removeField={() => removeField(field.id)}
              fieldNumber={index + 1}
            />
          ))}
          
          <Button
            onClick={addField}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Field
          </Button>
        </div>
        
        <Button onClick={saveForm} className="w-full">
          Save Form
        </Button>
        
        {!hasPremium && (
          <div className="bg-amber-50 text-amber-800 p-4 rounded-md text-sm border border-amber-200">
            <p className="font-medium">Premium Feature</p>
            <p>Free accounts are limited to 3 form fields. Upgrade for unlimited fields and advanced question types.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormBuilder;
