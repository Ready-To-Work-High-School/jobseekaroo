
import React from 'react';

const TabLoader = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
    <p className="text-sm text-muted-foreground">Loading content...</p>
  </div>
);

export default TabLoader;
