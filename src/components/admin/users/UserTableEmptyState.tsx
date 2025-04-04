
import React from 'react';
import { UsersIcon } from 'lucide-react';

export const UserTableEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-gray-50">
      <div className="bg-gray-100 p-3 rounded-full mb-4">
        <UsersIcon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
      <p className="text-sm text-gray-500 max-w-md">
        No users match the current filter criteria. Try adjusting your filters to see more results.
      </p>
    </div>
  );
};

export const UserTableLoadingState: React.FC = () => {
  return (
    <div className="border rounded-md divide-y">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
