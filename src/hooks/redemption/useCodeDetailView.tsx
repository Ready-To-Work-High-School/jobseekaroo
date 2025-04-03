
import React, { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';

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
      {/* Details and QR code modals would be rendered here */}
      {/* These will be passed from the component that uses this hook */}
    </>
  );

  return {
    detailsView,
    showDetailsModal,
    setShowDetailsModal,
    showQRCodeModal,
    setShowQRCodeModal,
    selectedCodeForDetails,
    selectedCodeForQR,
    handleViewDetails,
    handleViewQRCode
  };
}
