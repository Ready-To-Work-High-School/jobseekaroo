
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CredentialBadges from '@/components/auth/CredentialBadges';

const CredentialCard = () => {
  return (
    <Card className="border-blue-200">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-xl">Industry-Recognized Credentials</CardTitle>
        <CardDescription>
          Our students earn valuable credentials that demonstrate their job readiness
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <CredentialBadges />
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
