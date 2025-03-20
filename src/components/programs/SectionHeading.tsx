
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  eyebrowColor?: string;
  titleClassName?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  eyebrowColor = "bg-primary/10 text-primary",
  titleClassName
}: SectionHeadingProps) => {
  return (
    <div className="text-center mb-12">
      <span className={eyebrowColor}>
        {eyebrow}
      </span>
      <h2 className={cn("text-3xl font-bold mb-4", titleClassName)}>
        {title}
      </h2>
      <p className="max-w-2xl mx-auto text-zinc-950 font-medium">
        {description}
      </p>
    </div>
  );
};

export default SectionHeading;
