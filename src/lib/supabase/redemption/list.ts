
// Import from redemption types
import { RedemptionCode } from '@/types/redemption';

// Mock database of redemption codes
let mockRedemptionCodes: RedemptionCode[] = [
  {
    id: "1",
    code: "STUDENT2023A",
    type: "student",
    used: false,
    usedBy: undefined,
    usedAt: undefined,
    createdAt: new Date(),
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    schoolId: "default-school-id",
    isReusable: false
  },
  {
    id: "2",
    code: "EMPLOYER2023A",
    type: "employer",
    used: true,
    usedBy: "user123",
    usedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    schoolId: "default-school-id",
    isReusable: false
  },
  {
    id: "3",
    code: "STUDENT2023B",
    type: "student",
    used: false,
    usedBy: undefined,
    usedAt: undefined,
    createdAt: new Date(),
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    schoolId: "default-school-id",
    isReusable: false
  }
];

interface ListOptions {
  page?: number;
  pageSize?: number;
}

// Function to get redemption codes with optional filtering
export async function listRedemptionCodes(
  type?: 'student' | 'employer',
  used?: boolean,
  options?: ListOptions
): Promise<{ codes: RedemptionCode[]; count: number }> {
  // Filter by type and usage status if provided
  let filteredCodes = [...mockRedemptionCodes];
  
  if (type) {
    filteredCodes = filteredCodes.filter(code => code.type === type);
  }
  
  if (used !== undefined) {
    filteredCodes = filteredCodes.filter(code => code.used === used);
  }
  
  const totalCount = filteredCodes.length;
  
  // Apply pagination if options are provided
  if (options && options.page && options.pageSize) {
    const start = (options.page - 1) * options.pageSize;
    const end = start + options.pageSize;
    filteredCodes = filteredCodes.slice(start, end);
  }
  
  // Return the codes and total count
  return { codes: filteredCodes, count: totalCount };
}
