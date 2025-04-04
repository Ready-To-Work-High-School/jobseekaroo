
import React from 'react';
import { useCodeDetailView } from './hooks/useCodeDetailView';
import { useClipboard } from '@/hooks/useClipboard';

interface RedemptionCodeDetailViewProps {
  formatDate: (date?: Date | string) => string;
}

export function useRedemptionCodeDetailView({ formatDate }: RedemptionCodeDetailViewProps) {
  const { copyToClipboard } = useClipboard();
  return useCodeDetailView(copyToClipboard, formatDate);
}
