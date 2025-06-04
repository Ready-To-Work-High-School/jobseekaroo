
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

interface VerificationStepProps {
  onComplete: (data: any) => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  const verificationItems = [
    {
      icon: FileText,
      title: "Business Registration",
      description: "We'll verify your EIN and business registration",
      status: "required"
    },
    {
      icon: Shield,
      title: "Workers Compensation",
      description: "Proof of workers compensation insurance",
      status: "required"
    },
    {
      icon: CheckCircle,
      title: "Safety Pledge",
      description: "Commitment to providing a safe work environment",
      status: "required"
    }
  ];

  const handleStartVerification = () => {
    // Navigate to the verification form
    navigate('/employer/verify');
  };

  return (
    <Card>
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Business Verification</CardTitle>
            <CardDescription>
              Let's verify your business to ensure student safety and trust
            </CardDescription>
          </div>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Why Verification Matters</h4>
              <p className="text-sm text-blue-700 mt-1">
                Our verification process ensures that all employers on our platform are legitimate 
                businesses committed to providing safe, educational work experiences for high school students.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Verification Requirements</h3>
          
          {verificationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      Required
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">Quick Process</h4>
              <p className="text-sm text-green-700 mt-1">
                Most verifications are completed within 24-48 hours. You'll receive an email 
                confirmation once your business is approved.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6">
          <Button 
            size="lg" 
            onClick={handleStartVerification}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8"
          >
            Start Verification Process
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            This will take you to our secure verification form
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStep;
