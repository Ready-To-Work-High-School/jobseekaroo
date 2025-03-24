
import React, { useState } from 'react';
import RedemptionCodeDetails from '../../RedemptionCodeDetails';
import { RedemptionCode } from '@/types/redemption';
import QRCodeDialog from '../qr-code/QRCodeDialog';

export function useCodeDetailView(onCopyCode: (code: string) => void, formatDate: (date?: Date | string) => string) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [selectedCodeForDetails, setSelectedCodeForDetails] = useState<RedemptionCode | null>(null);
  const [selectedCodeForQR, setSelectedCodeForQR] = useState<RedemptionCode | null>(null);

  const handleViewDetails = (code: RedemptionCode) => {
    setSelectedCodeForDetails(code);
    setShowDetailsModal(true);
  };

  const handleViewQRCode = (code: RedemptionCode) => {
    setSelectedCodeForQR(code);
    setShowQRCodeModal(true);
  };

  const detailsView = (
    <>
      <RedemptionCodeDetails
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        selectedCode={selectedCodeForDetails}
        onCopyCode={onCopyCode}
        formatDate={formatDate}
      />
      <QRCodeDialog
        isOpen={showQRCodeModal}
        onClose={() => setShowQRCodeModal(false)}
        code={selectedCodeForQR}
      />
    </>
  );

  return {
    detailsView,
    handleViewDetails,
    handleViewQRCode
  };
}
