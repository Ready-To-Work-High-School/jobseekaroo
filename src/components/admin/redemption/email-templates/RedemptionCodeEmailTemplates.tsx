
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  messageBody: string;
}

interface RedemptionCodeEmailTemplatesProps {
  onSelectTemplate: (template: EmailTemplate) => void;
  initialTemplate?: EmailTemplate;
}

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome-student',
    name: 'Welcome (Student)',
    subject: 'Your Student Access Code',
    messageBody: `Dear Student,

Thank you for registering with our platform. Here is your access code:

{{code}}

This code will expire on {{expiryDate}}. Please follow these steps to complete your registration:
1. Visit our website at https://yourplatform.com/register
2. Enter your details and the code above
3. Complete your profile

If you have any questions, please don't hesitate to contact us.

Best regards,
The Support Team`
  },
  {
    id: 'welcome-employer',
    name: 'Welcome (Employer)',
    subject: 'Your Employer Access Code',
    messageBody: `Dear Partner,

Thank you for choosing our platform. Below is your employer access code:

{{code}}

This code will expire on {{expiryDate}}. To complete your registration:
1. Go to https://yourplatform.com/employer/register
2. Enter your business information and the code above
3. Set up your company profile

Should you need any assistance, our support team is available to help.

Best regards,
The Partnership Team`
  },
  {
    id: 'bulk-codes',
    name: 'Bulk Codes Distribution',
    subject: 'Your Access Codes',
    messageBody: `Hello,

Here are the access codes you requested:

{{codes}}

Each code will expire on its specified date. Please distribute them according to your organization's needs.

For any questions, please contact our support team.

Best regards,
The Admin Team`
  },
  {
    id: 'expiry-reminder',
    name: 'Expiry Reminder',
    subject: 'Your Access Code Will Expire Soon',
    messageBody: `Important Notice:

Your access code {{code}} will expire on {{expiryDate}}.

If you haven't used your code yet, please do so before the expiration date. Once expired, you will need to request a new code.

Thank you,
The Support Team`
  }
];

const RedemptionCodeEmailTemplates: React.FC<RedemptionCodeEmailTemplatesProps> = ({ 
  onSelectTemplate,
  initialTemplate
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTemplate?.id || 'welcome-student');
  const [customTemplate, setCustomTemplate] = useState<EmailTemplate>({
    id: 'custom',
    name: 'Custom Template',
    subject: initialTemplate?.subject || '',
    messageBody: initialTemplate?.messageBody || ''
  });
  
  const [isCustom, setIsCustom] = useState<boolean>(initialTemplate?.id === 'custom');
  
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    
    if (templateId === 'custom') {
      setIsCustom(true);
      onSelectTemplate(customTemplate);
    } else {
      setIsCustom(false);
      const template = DEFAULT_TEMPLATES.find(t => t.id === templateId);
      if (template) {
        onSelectTemplate(template);
      }
    }
  };
  
  const handleCustomTemplateChange = (field: keyof EmailTemplate, value: string) => {
    const updated = { ...customTemplate, [field]: value };
    setCustomTemplate(updated);
    
    if (isCustom) {
      onSelectTemplate(updated);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Template</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template-select">Select Template</Label>
          <Select
            value={selectedTemplateId}
            onValueChange={handleTemplateChange}
          >
            <SelectTrigger id="template-select">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_TEMPLATES.map(template => (
                <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
              ))}
              <SelectItem value="custom">Custom Template</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {isCustom ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="custom-subject">Email Subject</Label>
              <Input
                id="custom-subject"
                value={customTemplate.subject}
                onChange={(e) => handleCustomTemplateChange('subject', e.target.value)}
                placeholder="Enter email subject..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-message">Email Message</Label>
              <Textarea
                id="custom-message"
                value={customTemplate.messageBody}
                onChange={(e) => handleCustomTemplateChange('messageBody', e.target.value)}
                placeholder="Enter email message..."
                className="min-h-[200px]"
              />
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1 mt-4">
              <p>Available variables:</p>
              <ul className="list-disc pl-5">
                <li>{'{{code}}'} - The redemption code</li>
                <li>{'{{expiryDate}}'} - The code expiration date</li>
                <li>{'{{codes}}'} - All codes (for bulk emails)</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="border rounded-md p-4 bg-muted/20">
            <div className="mb-2">
              <span className="font-medium">Subject: </span>
              <span>{DEFAULT_TEMPLATES.find(t => t.id === selectedTemplateId)?.subject}</span>
            </div>
            <div>
              <span className="font-medium">Preview: </span>
              <pre className="mt-1 text-sm whitespace-pre-wrap">
                {DEFAULT_TEMPLATES.find(t => t.id === selectedTemplateId)?.messageBody}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RedemptionCodeEmailTemplates;
