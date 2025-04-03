
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import ContactCard from '@/components/employer/ContactCard';
import { useFadeIn } from '@/utils/animations';
import BackButton from '@/components/navigation/BackButton';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sanitizeHtml, containsXssVector } from '@/utils/sanitization';
import { supabase } from '@/integrations/supabase/client';
import validator from 'validator';

const ContactPage = () => {
  const fadeIn = useFadeIn(300);
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
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <BackButton className="mb-6" />
        
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-1">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-1">Message</Label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-2 border rounded-md"
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </Card>
          </div>
          
          <ContactCard />
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
