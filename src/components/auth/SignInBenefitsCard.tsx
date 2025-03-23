
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformBenefits from "./PlatformBenefits";
import CredentialBadges from "../auth/CredentialBadges";

const SignInBenefitsCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">What You'll Get Access To</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlatformBenefits />
        <CredentialBadges />
      </CardContent>
    </Card>
  );
};

export default SignInBenefitsCard;
