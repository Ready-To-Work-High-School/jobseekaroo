
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformBenefits from "./PlatformBenefits";

const SignInBenefitsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">What You'll Get Access To</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlatformBenefits />
        {/* CredentialBadges component removed */}
      </CardContent>
    </Card>
  );
};

export default SignInBenefitsCard;
