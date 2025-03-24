
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon, RefreshCw, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <TooltipProvider>
          <div className="container max-w-4xl py-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">Message Moderation</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="rounded-full">
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Admin Access Information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>This page is only accessible to admin users. Navigate here from the Admin menu.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Review and approve messages that require moderation before they are visible to recipients.
              </p>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={refreshMessages}
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Manually refresh the list of messages awaiting moderation</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <ModerationInstructions />
            
            <ErrorBoundary>
              {error && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                      <h3 className="text-red-800 font-medium flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" />
                        Error loading messages
                      </h3>
                      <p className="text-red-600">{error.message}</p>
                      <button 
                        onClick={refreshMessages}
                        className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Try Again
                      </button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>This error occurred while fetching messages. Try refreshing or contact support if the issue persists.</p>
                  </TooltipContent>
                </Tooltip>
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
        </TooltipProvider>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminMessageModeration;
