
export interface Company {
  name: string;
  industry: string;
  location: string;
  logoUrl?: string;
  website?: string;
  salaryRange?: string;
}

export const topJacksonvilleCompanies: Company[] = [
  {
    name: "Mayo Clinic",
    industry: "Healthcare",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/mayoclinic.org",
    website: "https://www.mayoclinic.org",
    salaryRange: "$50,000 - $90,000"
  },
  {
    name: "Baptist Health",
    industry: "Healthcare",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/baptistjax.com",
    website: "https://www.baptistjax.com",
    salaryRange: "$45,000 - $85,000"
  },
  {
    name: "Florida Blue",
    industry: "Insurance",
    location: "Jacksonville, FL",
    logoUrl: "/lovable-uploads/73c2c288-a239-474f-bf32-fe55902e3cbd.png",
    website: "https://www.floridablue.com",
    salaryRange: "$55,000 - $95,000"
  },
  {
    name: "CSX Corporation",
    industry: "Transportation",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/csx.com",
    website: "https://www.csx.com",
    salaryRange: "$60,000 - $100,000"
  },
  {
    name: "Vystar Credit Union",
    industry: "Financial Services",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/vystarcu.org",
    website: "https://www.vystarcu.org",
    salaryRange: "$40,000 - $80,000"
  },
  {
    name: "Web.com",
    industry: "Technology",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/web.com",
    website: "https://www.web.com",
    salaryRange: "$65,000 - $105,000"
  },
  {
    name: "Fidelity National Financial",
    industry: "Financial Services",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/fnf.com",
    website: "https://www.fnf.com",
    salaryRange: "$55,000 - $95,000"
  },
  {
    name: "Acosta",
    industry: "Sales & Marketing",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/acosta.com",
    website: "https://www.acosta.com",
    salaryRange: "$45,000 - $85,000"
  },
  {
    name: "Johnson & Johnson Vision",
    industry: "Healthcare",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/jnjvisioncare.com",
    website: "https://www.jjvision.com",
    salaryRange: "$50,000 - $90,000"
  },
  {
    name: "Southeastern Grocers",
    industry: "Retail",
    location: "Jacksonville, FL",
    logoUrl: "https://logo.clearbit.com/segrocers.com",
    website: "https://www.segrocers.com",
    salaryRange: "$35,000 - $75,000"
  }
];
