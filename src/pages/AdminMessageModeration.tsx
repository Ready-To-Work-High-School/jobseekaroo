
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, XIcon, UserIcon, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

interface ModerationMessage {
  id: string;
  conversation_id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender_name: string;
  sender_avatar?: string;
  receiver_name: string;
  receiver_avatar?: string;
}

const AdminMessageModeration = () => {
  const [messages, setMessages] = useState<ModerationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile?.user_type !== 'admin') {
      navigate('/');
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
    } else {
      fetchMessagesForModeration();
      subscribeToNewMessages();
    }

    return () => {
      const channel = supabase.channel('moderation-messages');
      supabase.removeChannel(channel);
    };
  }, [userProfile]);

  const fetchMessagesForModeration = async () => {
    try {
      setIsLoading(true);
      
      // Get all messages that need moderation
      const { data, error } = await supabase
        .from('messages_for_moderation_view')
        .select('*')
        .is('is_approved', null)
        .eq('needs_moderation', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages for moderation:', error);
      toast({
        title: "Failed to load messages",
        description: "There was an error loading messages for moderation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNewMessages = () => {
    const channel = supabase
      .channel('moderation-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `needs_moderation=eq.true`
        },
        () => {
          fetchMessagesForModeration();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `needs_moderation=eq.true`
        },
        () => {
          fetchMessagesForModeration();
        }
      )
      .subscribe();
  };

  const approveMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_approved: true })
        .eq('id', messageId);
      
      if (error) throw error;
      
      toast({
        title: "Message approved",
        description: "The message has been approved and is now visible to the recipient",
      });
      
      // Remove the approved message from the list
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error approving message:', error);
      toast({
        title: "Failed to approve message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const rejectMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_approved: false })
        .eq('id', messageId);
      
      if (error) throw error;
      
      toast({
        title: "Message rejected",
        description: "The message has been rejected and will not be visible to the recipient",
      });
      
      // Remove the rejected message from the list
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error rejecting message:', error);
      toast({
        title: "Failed to reject message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <ProtectedRoute requiredRoles={['admin']} adminOnly={true}>
        <div className="container py-6">
          <h1 className="text-2xl font-bold mb-6">Message Moderation</h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64 p-6 text-center">
                <Badge variant="secondary" className="mb-4">All Clear</Badge>
                <h3 className="text-lg font-medium">No messages pending moderation</h3>
                <p className="text-muted-foreground mt-2">
                  All messages have been reviewed
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={message.sender_avatar || ''} alt={message.sender_name} />
                          <AvatarFallback>
                            {message.sender_name?.charAt(0).toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{message.sender_name}</CardTitle>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>To: {message.receiver_name}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                      <Badge>Needs Moderation</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 whitespace-pre-wrap">{message.content}</p>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        onClick={() => rejectMessage(message.id)} 
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <XIcon className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        onClick={() => approveMessage(message.id)}
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default AdminMessageModeration;
