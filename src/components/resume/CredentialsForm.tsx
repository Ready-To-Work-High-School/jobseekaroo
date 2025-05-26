
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Award, Calendar } from 'lucide-react';

const CredentialsForm = ({ data, onUpdate }) => {
  const [newCredential, setNewCredential] = useState({
    name: '',
    issuer: '',
    dateEarned: '',
    description: ''
  });

  const addCredential = () => {
    if (newCredential.name.trim() && newCredential.issuer.trim()) {
      const credential = {
        ...newCredential,
        id: Date.now()
      };
      onUpdate([...data, credential]);
      setNewCredential({
        name: '',
        issuer: '',
        dateEarned: '',
        description: ''
      });
    }
  };

  const removeCredential = (credentialId) => {
    onUpdate(data.filter(credential => credential.id !== credentialId));
  };

  const handleInputChange = (field, value) => {
    setNewCredential(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSuggestedCredential = (credentialName, issuerName) => {
    handleInputChange('name', credentialName);
    handleInputChange('issuer', issuerName);
  };

  const suggestedCredentials = [
    { name: 'CPR Certification', issuer: 'American Red Cross' },
    { name: 'First Aid Certification', issuer: 'American Red Cross' },
    { name: 'Computer Science Certification', issuer: 'CompTIA' },
    { name: 'Microsoft Office Specialist', issuer: 'Microsoft' },
    { name: 'Google Workspace Certified', issuer: 'Google' },
    { name: 'WordPress Certification', issuer: 'WordPress Foundation' },
    { name: 'Entrepreneur & Small Business Industry Certification', issuer: 'SBA' },
    { name: 'Certified Nursing Assistant', issuer: 'State Board of Nursing' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          Credentials & Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="credentialName">Credential/Certification Name</Label>
              <Input
                id="credentialName"
                value={newCredential.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., CPR Certification"
              />
            </div>
            <div>
              <Label htmlFor="issuer">Issuing Organization</Label>
              <Input
                id="issuer"
                value={newCredential.issuer}
                onChange={(e) => handleInputChange('issuer', e.target.value)}
                placeholder="e.g., American Red Cross"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dateEarned">Date Earned</Label>
            <Input
              id="dateEarned"
              type="date"
              value={newCredential.dateEarned}
              onChange={(e) => handleInputChange('dateEarned', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={newCredential.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Briefly describe what this credential demonstrates..."
              rows={2}
            />
          </div>

          <Button onClick={addCredential} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Credential
          </Button>
        </div>

        {data.length > 0 && (
          <div>
            <Label>Your Credentials</Label>
            <div className="space-y-3 mt-2">
              {data.map((credential) => (
                <div key={credential.id} className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{credential.name}</h4>
                      <p className="text-sm text-muted-foreground">{credential.issuer}</p>
                      {credential.dateEarned && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(credential.dateEarned).toLocaleDateString()}
                        </p>
                      )}
                      {credential.description && (
                        <p className="text-sm mt-1">{credential.description}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCredential(credential.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>Suggested Credentials</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Common certifications that employers value:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {suggestedCredentials.map((credential, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => addSuggestedCredential(credential.name, credential.issuer)}
                className="justify-start text-left"
              >
                <Plus className="h-3 w-3 mr-2" />
                <div>
                  <div className="font-medium">{credential.name}</div>
                  <div className="text-xs text-muted-foreground">{credential.issuer}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialsForm;
