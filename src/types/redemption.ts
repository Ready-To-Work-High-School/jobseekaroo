
export interface RedemptionCode {
  id: string;
  code: string;
  type: 'student' | 'employer' | 'admin';
  used: boolean;
  usedBy?: string;
  usedAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
  schoolId?: string; // New field for school association
}
