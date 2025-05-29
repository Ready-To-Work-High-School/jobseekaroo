
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { sanitizeHtml, containsXssVector, validateUrl } from '@/utils/sanitization';
import { checkRateLimit } from '@/contexts/auth/services/rateLimit';

const QuickJobPost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityChecks, setSecurityChecks] = useState({
    rateLimitOk: true,
    urlValidated: true,
    noMaliciousContent: true
  });

  // Security validation on component mount
  useEffect(() => {
    // Check if this is a legitimate referrer
    const referrer = document.referrer;
    if (referrer && !validateUrl(referrer)) {
      console.warn('Invalid referrer detected:', referrer);
      setSecurityChecks(prev => ({ ...prev, urlValidated: false }));
    }

    // Basic rate limiting check
    const userIP = 'user-ip'; // In a real app, this would be the actual IP
    if (!checkRateLimit(userIP)) {
      setSecurityChecks(prev => ({ ...prev, rateLimitOk: false }));
      toast({
        title: "Rate Limit Exceeded",
        description: "Too many requests. Please wait before submitting another job.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    jobTitle: '',
    location: '',
    jobType: '',
    payRate: '',
    description: '',
    requirements: '',
    contactPhone: ''
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Sanitize and validate all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (containsXssVector(value)) {
        errors[key] = 'Invalid characters detected. Please remove any special characters or scripts.';
        setSecurityChecks(prev => ({ ...prev, noMaliciousContent: false }));
      }
    });

    // Required field validation
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.contactEmail.trim()) errors.contactEmail = 'Contact email is required';
    if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.jobType) errors.jobType = 'Job type is required';
    if (!formData.description.trim()) errors.description = 'Job description is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }

    // Phone validation (if provided)
    if (formData.contactPhone && !/^[\d\s\-\+\(\)]+$/.test(formData.contactPhone)) {
      errors.contactPhone = 'Please enter a valid phone number';
    }

    // Pay rate validation
    if (formData.payRate && !/^\d+(\.\d{2})?$/.test(formData.payRate)) {
      errors.payRate = 'Please enter a valid pay rate (e.g., 15.00)';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    // Sanitize input in real-time
    const sanitizedValue = sanitizeHtml(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors below before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (!securityChecks.rateLimitOk || !securityChecks.noMaliciousContent) {
      toast({
        title: "Security Check Failed",
        description: "Your submission has been blocked for security reasons.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize all form data before submission
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, sanitizeHtml(value)])
      );

      // In a real application, this would be sent to a secure backend API
      console.log('Secure job submission:', sanitizedData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Job Submitted Successfully!",
        description: "Your job posting has been submitted for review. We'll contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        companyName: '',
        contactEmail: '',
        jobTitle: '',
        location: '',
        jobType: '',
        payRate: '',
        description: '',
        requirements: '',
        contactPhone: ''
      });

      // Navigate to success page or employer dashboard
      navigate('/for-employers');
      
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your job. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const securityIndicator = securityChecks.rateLimitOk && securityChecks.noMaliciousContent && securityChecks.urlValidated;

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Quick Job Posting</h1>
          <p className="text-muted-foreground">
            Post a job quickly and securely. All submissions are reviewed for safety and compliance.
          </p>
          
          <div className={`flex items-center gap-2 justify-center mt-4 p-2 rounded-lg ${
            securityIndicator ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {securityIndicator ? (
              <>
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Secure Connection Verified</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Security Check Failed</span>
              </>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={validationErrors.companyName ? 'border-red-500' : ''}
                    maxLength={100}
                    required
                  />
                  {validationErrors.companyName && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.companyName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className={validationErrors.contactEmail ? 'border-red-500' : ''}
                    maxLength={100}
                    required
                  />
                  {validationErrors.contactEmail && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.contactEmail}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className={validationErrors.jobTitle ? 'border-red-500' : ''}
                  maxLength={100}
                  required
                />
                {validationErrors.jobTitle && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.jobTitle}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State"
                    className={validationErrors.location ? 'border-red-500' : ''}
                    maxLength={100}
                    required
                  />
                  {validationErrors.location && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.location}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                    <SelectTrigger className={validationErrors.jobType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="summer-job">Summer Job</SelectItem>
                      <SelectItem value="after-school">After School</SelectItem>
                      <SelectItem value="weekend">Weekend</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.jobType && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.jobType}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payRate">Pay Rate (per hour)</Label>
                  <Input
                    id="payRate"
                    value={formData.payRate}
                    onChange={(e) => handleInputChange('payRate', e.target.value)}
                    placeholder="15.00"
                    className={validationErrors.payRate ? 'border-red-500' : ''}
                    maxLength={10}
                  />
                  {validationErrors.payRate && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.payRate}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className={validationErrors.contactPhone ? 'border-red-500' : ''}
                    maxLength={20}
                  />
                  {validationErrors.contactPhone && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.contactPhone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the job responsibilities, work environment, and what makes this a great opportunity for high school students..."
                  className={validationErrors.description ? 'border-red-500' : ''}
                  maxLength={1000}
                  rows={4}
                  required
                />
                {validationErrors.description && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.description}</p>
                )}
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="List any specific skills, experience, or requirements for this position..."
                  maxLength={500}
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">What happens next?</h4>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>• Your job posting will be reviewed within 24 hours</li>
                      <li>• We verify all jobs are safe and appropriate for high school students</li>
                      <li>• Once approved, your job will be visible to students</li>
                      <li>• You'll receive email notifications when students apply</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !securityIndicator}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Job for Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QuickJobPost;
