
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CredentialBadges from '@/components/auth/CredentialBadges';

const CredentialCard = () => {
  return (
    <Card className="border-blue-200">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-blue-800">Student Credentials & Certifications</CardTitle>
        <CardDescription>
          Our students earn industry-recognized credentials that validate their skills and knowledge
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <CredentialBadges />
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
