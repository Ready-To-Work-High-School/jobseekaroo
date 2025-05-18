
import React from 'react';

const AirtableEmbed = () => {
  return (
    <div className="mt-8 rounded-lg overflow-hidden border border-gray-200">
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/appAnw766HxxmGh3G/shrilzOONxcq9zqPR"
        frameBorder="0"
        width="100%"
        height="533"
        style={{ background: 'transparent', border: '1px solid #ccc' }}
        title="Premium Employer Data"
      ></iframe>
    </div>
  );
};

export default AirtableEmbed;
