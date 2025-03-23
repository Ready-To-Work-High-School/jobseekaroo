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
}: FeatureCardProps) => <div className="p-6 rounded-lg border border-amber-300 shadow-sm hover:shadow-md transition-shadow bg-white h-full flex flex-col">
    <div className="mb-3 text-2xl">{icon}</div>
    <h3 className="text-lg font-medium mb-2 min-h-[48px] text-blue-950">{title}</h3>
    <p className="text-sm text-zinc-700 flex-grow">{description}</p>
  </div>;
export default FeatureCard;