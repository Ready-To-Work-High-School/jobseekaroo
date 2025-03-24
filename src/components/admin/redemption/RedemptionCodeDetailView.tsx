
import React from 'react';
import { useCodeDetailView } from './hooks/useCodeDetailView';

interface RedemptionCodeDetailViewProps {
  formatDate: (date?: Date | string) => string;
}

export function useRedemptionCodeDetailView({ formatDate }: RedemptionCodeDetailViewProps) {
  return useCodeDetailView({ formatDate });
}
