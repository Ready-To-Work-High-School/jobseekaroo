import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { ConversationList } from '@/components/messaging/ConversationList';
import { ConversationView } from '@/components/messaging/ConversationView';
import { Card } from '@/components/ui/card';
import { Conversation } from '@/types/message';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  // Determine if the user is under 18 and needs moderation
  const [requiresModeration, setRequiresModeration] = useState(false);

  useEffect(() => {
    if (user && userProfile) {
      // Check if user is a minor (needs moderation)
      // This is a placeholder - you would need to add a birthdate field to profiles
      // and calculate if they're under 18
      const isMinor = userProfile.user_type === 'student' && userProfile.preferences?.is_minor === true;
      setRequiresModeration(isMinor);
    }
  }, [user, userProfile]);

  useEffect(() => {
    if (user) {
      fetchConversations();
      subscribeToConversationUpdates();
    }
    
    return () => {
      const channel = supabase.channel('conversations');
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Get all conversations where the user is a participant
      const { data, error } = await supabase
        .from('conversations_with_participants_view')
        .select('*')
        .eq('user_id', user.id)
        .order('last_message_at', { ascending: false });
      
      if (error) throw error;
      
      setConversations(data || []);
      
      // Select the first conversation by default if available
      if (data && data.length > 0 && !selectedConversationId) {
        setSelectedConversationId(data[0].id);
      }
      
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToConversationUpdates = () => {
    if (!user) return;
    
    const channel = supabase
      .channel('conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations_with_participants_view',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  return (
    <Layout>
      <ProtectedRoute>
        <div className="container py-6">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <h2 className="text-lg font-medium mb-3">Conversations</h2>
                <ConversationList
                  conversations={conversations}
                  selectedConversationId={selectedConversationId}
                  onSelectConversation={handleSelectConversation}
                />
              </div>
              
              <div className="md:col-span-3">
                {selectedConversation ? (
                  <ConversationView
                    conversationId={selectedConversation.id}
                    participantName={selectedConversation.participant_name}
                    participantAvatar={selectedConversation.participant_avatar}
                    participantId={selectedConversation.participant_id}
                    requiresModeration={requiresModeration}
                  />
                ) : (
                  <Card className="flex flex-col items-center justify-center h-96 p-6 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No conversation selected</h3>
                    <p className="text-muted-foreground mt-2">
                      {conversations.length === 0 
                        ? "You don't have any conversations yet" 
                        : "Select a conversation from the list to view messages"}
                    </p>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Messages;
