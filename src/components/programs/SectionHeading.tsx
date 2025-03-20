import React from 'react';
interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  eyebrowColor?: string;
}
const SectionHeading = ({
  eyebrow,
  title,
  description,
  eyebrowColor = "bg-primary/10 text-primary"
}: SectionHeadingProps) => {
  return <div className="text-center mb-12">
      <span className="">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="max-w-2xl mx-auto font-semibold text-zinc-950">
        {description}
      </p>
    </div>;
};
export default SectionHeading;