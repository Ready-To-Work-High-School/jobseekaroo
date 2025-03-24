
import React from 'react';
import Layout from '@/components/Layout';
import { useModerationMessages } from '@/hooks/useModerationMessages';
import { ModerationMessageItem } from '@/components/admin/ModerationMessageItem';
import { ModerationEmptyState } from '@/components/admin/ModerationEmptyState';
import { ModerationLoadingState } from '@/components/admin/ModerationLoadingState';
import { ModerationInstructions } from '@/components/admin/ModerationInstructions';
import ErrorBoundary from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';
import CopyProtection from '@/components/CopyProtection';

const AdminMessageModeration = () => {
  const { 
    messages, 
    isLoading, 
    approveMessage, 
    rejectMessage,
    refreshMessages,
    error
  } = useModerationMessages();

  return (
    <ProtectedRoute adminOnly>
      <Layout>
        <div className="container max-w-4xl py-8">
          <h1 className="text-3xl font-bold mb-2">Message Moderation</h1>
          <p className="text-muted-foreground mb-6">
            Review and approve messages that require moderation before they are visible to recipients.
          </p>
          
          <ModerationInstructions />
          
          <ErrorBoundary>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <h3 className="text-red-800 font-medium">Error loading messages</h3>
                <p className="text-red-600">{error.message}</p>
                <button 
                  onClick={refreshMessages}
                  className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                >
                  Try Again
                </button>
              </div>
            )}
          
            {isLoading ? (
              <ModerationLoadingState />
            ) : messages.length === 0 ? (
              <ModerationEmptyState />
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ModerationMessageItem
                    key={message.id}
                    message={message}
                    onApprove={approveMessage}
                    onReject={rejectMessage}
                  />
                ))}
              </div>
            )}
          </ErrorBoundary>
          
          {/* Prevent unauthorized copying of sensitive moderation content */}
          <CopyProtection showNotice={false} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminMessageModeration;
