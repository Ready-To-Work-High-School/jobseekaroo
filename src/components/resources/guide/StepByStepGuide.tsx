import React from 'react';
import DOMPurify from 'dompurify';

interface StepByStepGuideProps {
  stepsText: string;
}

const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ stepsText }) => {
  // Check if the text contains HTML tags
  const containsHtml = /<\/?[a-z][\s\S]*>/i.test(stepsText);

  // If contains HTML, sanitize and render as HTML
  if (containsHtml) {
    const sanitizedHtml = DOMPurify.sanitize(stepsText);
    return (
      <div className="prose prose-blue max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </div>
    );
  }
  
  // Otherwise render as plain text
  return (
    <div className="prose prose-blue max-w-none dark:prose-invert">
      <p>{stepsText}</p>
    </div>
  );
};

export default StepByStepGuide;
