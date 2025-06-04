
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <div className="text-center py-8">
      <h3 className="text-xl font-medium mb-4">Need specialized support for your school?</h3>
      <Button size="lg" asChild>
        <Link to="/contact">Contact our Education Team</Link>
      </Button>
    </div>
  );
};

export default ContactSection;
