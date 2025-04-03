
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import ContactCard from '@/components/employer/ContactCard';
import { useFadeIn } from '@/utils/animations';
import BackButton from '@/components/navigation/BackButton';

const ContactPage = () => {
  const fadeIn = useFadeIn(300);
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <BackButton className="mb-6" />
        
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-2 border rounded-md"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Message
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
