
export interface RedemptionCode {
  id: string;
  code: string;
  type: 'student' | 'employer' | 'admin';
  used: boolean;
  usedBy?: string;
  usedAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

export interface RedemptionCodeValidation {
  isValid: boolean;
  message: string;
  code?: RedemptionCode;
}
