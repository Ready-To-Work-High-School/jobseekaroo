
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { getImageSizes } from '@/utils/imageUtils';

const EmployerDirectAccessSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Badge className="mb-2">EXCLUSIVE BENEFIT</Badge>
          <h2 className="text-2xl font-bold mb-4">Direct Access to Verified Students</h2>
          <p className="mb-4 text-muted-foreground">
            Our platform gives you direct access to students with verified credentials and skills.
            All students on our platform have completed industry-standard assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/sign-up">Create Employer Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/employer-badges">View Student Credentials</Link>
            </Button>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden border-4 border-white shadow-lg hidden md:block">
          <LazyImage
            src="/lovable-uploads/5bd40401-b911-4d3b-a1f2-3e1712199dbc.png"
            alt="Employer Dashboard Preview"
            className="object-cover w-full h-full"
            sizes={getImageSizes('hero')}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerDirectAccessSection;
