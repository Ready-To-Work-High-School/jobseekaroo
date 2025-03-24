
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '@/types/message';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export const ConversationList = ({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation 
}: ConversationListProps) => {
  return (
    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
      {conversations.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No conversations yet
        </div>
      ) : (
        conversations.map((conversation) => (
          <Card 
            key={conversation.id} 
            className={cn(
              "cursor-pointer hover:bg-accent transition-colors",
              selectedConversationId === conversation.id && "bg-accent"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <CardContent className="p-4 flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={conversation.participant_avatar || ''} alt={conversation.participant_name} />
                <AvatarFallback>
                  {conversation.participant_name?.charAt(0).toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm truncate">
                    {conversation.participant_name}
                  </h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {conversation.unread_count > 0 && (
                    <Badge variant="secondary" className="mr-1 h-5 min-w-5 px-1">
                      {conversation.unread_count}
                    </Badge>
                  )}
                  {conversation.last_message}
                </p>
                
                {conversation.has_pending_moderation && (
                  <Badge variant="outline" className="mt-1 bg-yellow-100 text-yellow-800">
                    Pending moderation
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
