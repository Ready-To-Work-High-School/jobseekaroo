
import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeDisplayProps {
  qrValue: string;
  size: number;
  timeLeft: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrValue,
  size,
  timeLeft
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border relative">
      <QRCode
        id="job-creation-qr"
        value={qrValue}
        size={size}
        level="H"
      />
      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
        {timeLeft}s
      </div>
    </div>
  );
};

export default QRCodeDisplay;
