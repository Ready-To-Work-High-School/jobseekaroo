import { cn } from "@/lib/utils";
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}
const FeatureCard = ({
  icon,
  title,
  description
}: FeatureCardProps) => <div className="p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow bg-amber-400">
    <div className="mb-3 text-2xl">{icon}</div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-sm text-zinc-950">{description}</p>
  </div>;
export default FeatureCard;