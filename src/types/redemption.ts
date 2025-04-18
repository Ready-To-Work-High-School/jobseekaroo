
export interface RedemptionCode {
  id: string;
  code: string;
  type: 'student' | 'employer' | 'admin';
  used: boolean;
  usedBy?: string;
  usedAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
  schoolId: string;
  isReusable: boolean;
}

export interface RedemptionCodeValidation {
  isValid: boolean;
  message: string;
  code?: RedemptionCode;
}
