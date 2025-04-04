
import { Building, MapPin, DollarSign } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export type Company = {
  name: string;
  location: string;
  salaryRange: string;
  industry: string;
  icon: LucideIcon;
  website?: string;
};

export const topJacksonvilleCompanies: Company[] = [
  {
    name: "CSX Corporation",
    location: "500 Water St, Jacksonville, FL 32202",
    salaryRange: "$65,000 - $145,000",
    industry: "Transportation",
    icon: Building,
    website: "https://www.csx.com/careers/"
  },
  {
    name: "Florida Blue (GuideWell)",
    location: "4800 Deerwood Campus Pkwy, Jacksonville, FL 32246",
    salaryRange: "$60,000 - $140,000",
    industry: "Healthcare Insurance",
    icon: Building,
    website: "https://www.floridablue.com/careers"
  },
  {
    name: "Fidelity National Financial",
    location: "601 Riverside Ave, Jacksonville, FL 32204",
    salaryRange: "$70,000 - $150,000",
    industry: "Financial Services",
    icon: Building,
    website: "https://fnf.com/careers"
  },
  {
    name: "Johnson & Johnson Vision",
    location: "7500 Centurion Pkwy, Jacksonville, FL 32256",
    salaryRange: "$65,000 - $140,000",
    industry: "Healthcare",
    icon: Building,
    website: "https://www.jjvision.com/careers"
  },
  {
    name: "Mayo Clinic",
    location: "4500 San Pablo Rd S, Jacksonville, FL 32224",
    salaryRange: "$70,000 - $160,000",
    industry: "Healthcare",
    icon: Building,
    website: "https://jobs.mayo.edu/"
  },
  {
    name: "Black Knight Financial Services",
    location: "601 Riverside Ave, Jacksonville, FL 32204",
    salaryRange: "$65,000 - $135,000",
    industry: "Financial Technology",
    icon: Building,
    website: "https://www.blackknightinc.com/careers/"
  },
  {
    name: "Deutsche Bank",
    location: "5022 Gate Pkwy, Jacksonville, FL 32256",
    salaryRange: "$75,000 - $155,000",
    industry: "Banking",
    icon: Building,
    website: "https://careers.db.com/"
  },
  {
    name: "Acosta Sales & Marketing",
    location: "6600 Corporate Center Pkwy, Jacksonville, FL 32216",
    salaryRange: "$55,000 - $125,000",
    industry: "Marketing",
    icon: Building,
    website: "https://www.acosta.com/careers"
  },
  {
    name: "Web.com",
    location: "5335 Gate Pkwy, Jacksonville, FL 32256",
    salaryRange: "$60,000 - $130,000",
    industry: "Technology",
    icon: Building,
    website: "https://www.web.com/careers"
  },
  {
    name: "Southeastern Grocers (Winn-Dixie)",
    location: "8928 Prominence Pkwy, Jacksonville, FL 32256",
    salaryRange: "$50,000 - $120,000",
    industry: "Retail/Grocery",
    icon: Building,
    website: "https://www.segrocers.com/careers"
  }
];
