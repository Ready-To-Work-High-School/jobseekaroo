
import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/types/application";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
  switch (status) {
    case "applied":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Applied
        </Badge>
      );

    case "interviewing":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          Interviewing
        </Badge>
      );

    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Rejected
        </Badge>
      );

    case "accepted":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Accepted
        </Badge>
      );

    case "withdrawn":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          Withdrawn
        </Badge>
      );

    case "offered":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          Offer Received
        </Badge>
      );

    case "hired":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          Hired
        </Badge>
      );

    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          Pending
        </Badge>
      );

    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          {status}
        </Badge>
      );
  }
};

export default ApplicationStatusBadge;
