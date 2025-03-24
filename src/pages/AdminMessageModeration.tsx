
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ModerationMessageItem } from '@/components/admin/ModerationMessageItem';
import { ModerationEmptyState } from '@/components/admin/ModerationEmptyState';
import { ModerationLoadingState } from '@/components/admin/ModerationLoadingState';
import { useModerationMessages } from '@/hooks/useModerationMessages';

const AdminMessageModeration = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { messages, isLoading, approveMessage, rejectMessage } = useModerationMessages();

  useEffect(() => {
    if (userProfile?.user_type !== 'admin') {
      navigate('/');
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
    }
  }, [userProfile, navigate, toast]);

  return (
    <Layout>
      <ProtectedRoute requiredRoles={['admin']} adminOnly={true}>
        <div className="container py-6">
          <h1 className="text-2xl font-bold mb-6">Message Moderation</h1>
          
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
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default AdminMessageModeration;
