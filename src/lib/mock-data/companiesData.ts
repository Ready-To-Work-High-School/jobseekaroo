
import { MapPin, DollarSign } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export type Company = {
  name: string;
  location: string;
  salaryRange: string;
  industry: string;
  icon: LucideIcon;
  website?: string;
  logoUrl: string;
};

export const topJacksonvilleCompanies: Company[] = [
  {
    name: "Mayo Clinic",
    location: "4500 San Pablo Rd S, Jacksonville, FL 32224",
    salaryRange: "$70,000 - $160,000",
    industry: "Healthcare",
    icon: MapPin,
    website: "https://jobs.mayo.edu/",
    logoUrl: "/lovable-uploads/da43ec61-9d66-4927-bf47-e3e785ac69a3.png"
  },
  {
    name: "CSX Corporation",
    location: "500 Water St, Jacksonville, FL 32202",
    salaryRange: "$65,000 - $145,000",
    industry: "Transportation",
    icon: MapPin,
    website: "https://www.csx.com/careers/",
    logoUrl: "/lovable-uploads/2d9d0a51-ca49-41ed-b782-afca86fd6cc0.png"
  },
  {
    name: "Florida Blue (GuideWell)",
    location: "4800 Deerwood Campus Pkwy, Jacksonville, FL 32246",
    salaryRange: "$60,000 - $140,000",
    industry: "Healthcare Insurance",
    icon: MapPin,
    website: "https://www.floridablue.com/careers",
    logoUrl: "/lovable-uploads/db565abc-8fe9-4ed1-833f-8ca8233a2e1c.png"
  },
  {
    name: "Johnson & Johnson Vision",
    location: "7500 Centurion Pkwy, Jacksonville, FL 32256",
    salaryRange: "$65,000 - $140,000",
    industry: "Healthcare",
    icon: MapPin,
    website: "https://www.jjvision.com/careers",
    logoUrl: "/lovable-uploads/d2b16034-eb1e-4b1f-a1e0-fb9e75e2318b.png"
  },
  {
    name: "Publix",
    location: "8928 Prominence Pkwy, Jacksonville, FL 32256",
    salaryRange: "$50,000 - $120,000",
    industry: "Retail/Grocery",
    icon: MapPin,
    website: "https://www.publix.com/careers",
    logoUrl: "/lovable-uploads/35d631dd-0044-4f2e-823c-4dc45510994f.png"
  },
  {
    name: "Fidelity National Financial",
    location: "601 Riverside Ave, Jacksonville, FL 32204",
    salaryRange: "$70,000 - $150,000",
    industry: "Financial Services",
    icon: MapPin,
    website: "https://fnf.com/careers",
    logoUrl: "/lovable-uploads/b0e0a756-2e03-4cb7-a548-107746b37666.png"
  },
  {
    name: "Web.com",
    location: "5335 Gate Pkwy, Jacksonville, FL 32256",
    salaryRange: "$60,000 - $130,000",
    industry: "Technology",
    icon: MapPin,
    website: "https://www.web.com/careers",
    logoUrl: "/lovable-uploads/611a1a85-1d8c-4650-a5f2-aafb8e3b2cb1.png"
  },
  {
    name: "Baptist Health",
    location: "841 Prudential Dr, Jacksonville, FL 32207",
    salaryRange: "$65,000 - $135,000",
    industry: "Healthcare",
    icon: MapPin,
    website: "https://www.baptistjax.com/careers",
    logoUrl: "/lovable-uploads/7358ed5d-5e1f-401b-b378-0f7679ff7802.png"
  },
  {
    name: "American Express",
    location: "5022 Gate Pkwy, Jacksonville, FL 32256",
    salaryRange: "$75,000 - $155,000",
    industry: "Finance",
    icon: MapPin,
    website: "https://careers.americanexpress.com/",
    logoUrl: "/lovable-uploads/b9f50947-0157-4677-9394-07c6b589cf6e.png"
  },
  {
    name: "Bank of America",
    location: "6600 Corporate Center Pkwy, Jacksonville, FL 32216",
    salaryRange: "$68,000 - $140,000",
    industry: "Finance",
    icon: MapPin,
    website: "https://careers.bankofamerica.com/",
    logoUrl: "/lovable-uploads/c71583b7-2543-47d9-9ac4-a4f9582752bd.png"
  },
  {
    name: "UnitedHealthcare",
    location: "6600 Corporate Center Pkwy, Jacksonville, FL 32216",
    salaryRange: "$68,000 - $140,000",
    industry: "Healthcare",
    icon: MapPin,
    website: "https://careers.unitedhealthgroup.com/",
    logoUrl: "/lovable-uploads/84397b4a-da78-47d9-9ed4-daa193847fd7.png"
  }
];
