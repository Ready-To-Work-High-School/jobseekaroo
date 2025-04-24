
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '@/contexts/auth';
import { useMfaManagement } from '@/hooks/useMfaManagement';
import { toast } from 'sonner';

export const MfaSettings: React.FC = () => {
  const { user } = useAuth();
  const { 
    isMfaEnabled, 
    isMfaLoading, 
    enrollMfa, 
    verifyMfa, 
    unenrollMfa,
    mfaFactors 
  } = useMfaManagement(user);

  const [enrollmentData, setEnrollmentData] = useState<{
    qrCode?: string;
    secret?: string;
    verificationCode: string;
  }>({ verificationCode: '' });

  const [isVerifying, setIsVerifying] = useState(false);

  const handleEnrollMfa = async () => {
    const result = await enrollMfa();
    if (result) {
      setEnrollmentData({
        qrCode: result.qrCode,
        secret: result.secret,
        verificationCode: ''
      });
    }
  };

  const handleVerifyMfa = async () => {
    if (!enrollmentData.secret) return;

    setIsVerifying(true);
    const result = await verifyMfa(
      enrollmentData.verificationCode,
      mfaFactors[0]?.id || ''
    );
    
    if (result) {
      setEnrollmentData({ verificationCode: '' });
    }
    setIsVerifying(false);
  };

  const handleUnenrollMfa = async () => {
    if (mfaFactors.length > 0) {
      await unenrollMfa(mfaFactors[0].id);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Multi-Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        {!isMfaEnabled ? (
          <div className="space-y-4">
            <Button 
              onClick={handleEnrollMfa} 
              disabled={isMfaLoading}
            >
              {isMfaLoading ? 'Setting Up...' : 'Enable MFA'}
            </Button>

            {enrollmentData.qrCode && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <QRCodeSVG value={enrollmentData.qrCode} />
                </div>
                <Input 
                  placeholder="Enter 6-digit verification code"
                  value={enrollmentData.verificationCode}
                  onChange={(e) => setEnrollmentData(prev => ({
                    ...prev, 
                    verificationCode: e.target.value
                  }))}
                  className="w-full"
                />
                <Button 
                  onClick={handleVerifyMfa}
                  disabled={
                    isVerifying || 
                    enrollmentData.verificationCode.length !== 6
                  }
                >
                  {isVerifying ? 'Verifying...' : 'Verify Code'}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p>MFA is currently enabled.</p>
            <Button 
              variant="destructive"
              onClick={handleUnenrollMfa}
              disabled={isMfaLoading}
            >
              Disable MFA
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
