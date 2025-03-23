
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformBenefits from "./PlatformBenefits";

const SignInBenefitsCard = () => {
  return (
    <Card className="border-blue-300 shadow-md">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-xl text-blue-800">What You'll Get Access To</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlatformBenefits />
      </CardContent>
    </Card>
  );
};

export default SignInBenefitsCard;
