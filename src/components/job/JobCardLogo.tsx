
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface JobCardLogoProps {
  logoUrl?: string;
  companyName: string;
  useAmberStyling?: boolean;
}

const JobCardLogo = ({ logoUrl, companyName, useAmberStyling = false }: JobCardLogoProps) => {
  const initials = companyName
    ? companyName
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'JB';

  const avatarClass = useAmberStyling
    ? "bg-amber-100 text-amber-800"
    : "bg-blue-100 text-blue-800";

  return (
    <Avatar className="h-10 w-10 rounded-md border">
      {logoUrl ? (
        <AvatarImage
          src={logoUrl}
          alt={companyName || 'Company logo'}
          className="object-cover"
        />
      ) : null}
      <AvatarFallback className={`rounded-md text-sm font-medium ${avatarClass}`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default JobCardLogo;
