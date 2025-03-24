
import { RedemptionCode, RedemptionCodeValidation } from '@/types/redemption';

// Email-related types
export interface SendRedemptionEmailParams {
  to: string;
  subject: string;
  message: string;
  codes: RedemptionCode[];
}
