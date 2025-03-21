
interface JobCardFeaturesProps {
  isRemote: boolean;
  isFlexible: boolean;
  experienceLevel: string;
  useAmberStyling: boolean;
}

const JobCardFeatures = ({ isRemote, isFlexible, experienceLevel, useAmberStyling }: JobCardFeaturesProps) => {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2" aria-label="Job features">
      {isRemote && (
        <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md bg-primary/10 text-primary text-[10px] sm:text-xs font-medium">
          Remote
        </span>
      )}
      
      {isFlexible && (
        <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${useAmberStyling ? 'bg-amber-500 text-white' : 'bg-amber-500 text-white'} text-[10px] sm:text-xs font-medium`}>
          Flexible
        </span>
      )}
      
      <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${useAmberStyling ? 'bg-amber-500 text-white' : 'bg-amber-500 text-white'} text-[10px] sm:text-xs font-medium capitalize`}>
        {experienceLevel.replace('-', ' ')}
      </span>
    </div>
  );
};

export default JobCardFeatures;
