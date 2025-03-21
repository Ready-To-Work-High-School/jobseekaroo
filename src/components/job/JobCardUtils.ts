
export const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

export const formatPayRange = (min: number, max: number, period: string) => {
  return `$${min}${max > min ? `-$${max}` : ''} ${period}`;
};

export const isJacksonvilleCompany = (companyName: string) => {
  const jacksonvilleCompanies = [
    "Jacksonville Electronics", 
    "Jacksonville Waterfront Hotel", 
    "TechSolutions Jacksonville"
  ];
  return jacksonvilleCompanies.includes(companyName);
};
