
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { sanitizeHtml, containsXssVector } from '@/utils/sanitization';
import { supabase } from '@/integrations/supabase/client';
import validator from 'validator';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize sanitized values
  const [safeName, setSafeName] = useState('');
  const [safeEmail, setSafeEmail] = useState('');
  const [safeMessage, setSafeMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Sanitize inputs
    const currentSafeName = sanitizeHtml(name);
    const currentSafeEmail = sanitizeHtml(email, true); // Email-specific
    const currentSafeMessage = sanitizeHtml(message);
    
    // Update state with sanitized values
    setSafeName(currentSafeName);
    setSafeEmail(currentSafeEmail);
    setSafeMessage(currentSafeMessage);
    
    // Check for XSS vectors in raw input
    if (containsXssVector(name) || containsXssVector(email) || containsXssVector(message)) {
      toast({
        title: "Security Warning",
        description: "Potentially malicious content detected and sanitized.",
        variant: "destructive"
      });
    }
    
    // Email validation using validator.isEmail on sanitized email
    if (!validator.isEmail(currentSafeEmail)) {
      toast({ 
        title: "Invalid Email", 
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call the edge function using supabase client
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: { 
          name: currentSafeName, 
          email: currentSafeEmail, 
          message: currentSafeMessage 
        }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to submit contact form');
      }
      
      // Clear form on success
      setName('');
      setEmail('');
      setMessage('');
      setSafeName('');
      setSafeEmail('');
      setSafeMessage('');
      
      toast({
        title: "Success",
        description: data?.message || "Your message has been sent. We'll get back to you soon!",
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Display sanitized values or sanitize on demand
  const displayName = safeName || sanitizeHtml(name);
  const displayEmail = safeEmail || sanitizeHtml(email, true);
  const displayMessage = safeMessage || sanitizeHtml(message);
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-500 mb-8 text-center">
          Have questions or feedback? We'd love to hear from you!
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Complete the form below and we'll respond as soon as possible.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message"
                  rows={5}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
