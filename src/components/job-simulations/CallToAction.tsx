
import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  scrollToTop: () => void;
}

const CallToAction = ({ scrollToTop }: CallToActionProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Career?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Start building practical skills today with our interactive job simulations designed 
        to give you the experience employers are looking for.
      </p>
      <Button 
        size="lg"
        onClick={scrollToTop}
      >
        Explore All Simulations
      </Button>
    </div>
  );
};

export default CallToAction;
