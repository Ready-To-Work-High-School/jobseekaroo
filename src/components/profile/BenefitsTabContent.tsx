import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { formatDate, formatPremiumStatus } from '@/utils/format';

const BenefitsTabContent = () => {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return <Alert variant="destructive">
      <XCircle className="h-4 w-4 mr-2" />
      User profile not loaded.
    </Alert>;
  }

  const hasPremium = userProfile.premium_status || userProfile.preferences?.hasPremium;
  const redeemedCode = userProfile.redeemed_code;
  const redeemedAt = userProfile.redeemed_at;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Premium Status</CardTitle>
        </CardHeader>
        <CardContent>
          {hasPremium ? (
            <Alert>
              <CheckCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                You have premium access! Enjoy enhanced features and benefits.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                You do not have premium access. Upgrade to unlock exclusive features.
              </AlertDescription>
            </Alert>
          )}
          {userProfile.premium_status && (
            <p className="text-sm text-muted-foreground mt-2">
              Status: {formatPremiumStatus(userProfile.premium_status)}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redemption Code</CardTitle>
        </CardHeader>
        <CardContent>
          {redeemedCode ? (
            <Alert>
              <CheckCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                You have successfully redeemed a code.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                You have not redeemed a code yet.
              </AlertDescription>
            </Alert>
          )}
          {redeemedAt && (
            <p className="text-sm text-muted-foreground mt-2">
              Redeemed on: {formatDate(redeemedAt)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const alertVariant = (status: string): "default" | "destructive" => {
  if (status === "error" || status === "warning") {
    return "destructive";
  }
  return "default";
};

export default BenefitsTabContent;
