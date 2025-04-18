
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Search, Send, User, Clock, CheckCircle, Users } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  avatar?: string;
  jobTitle: string;
  lastMessage?: string;
  lastActive: string;
  unread?: number;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    jobTitle: 'Retail Associate Applicant',
    lastMessage: 'Thank you for the interview opportunity!',
    lastActive: '5m ago',
    unread: 2
  },
  {
    id: '2',
    name: 'David Rodriguez',
    jobTitle: 'Administrative Assistant Applicant',
    lastMessage: 'I\'m available for an interview on Wednesday',
    lastActive: '2h ago',
    unread: 0
  },
  {
    id: '3',
    name: 'Emily Johnson',
    jobTitle: 'Customer Service Rep Applicant',
    lastMessage: 'Could you please send more information about the position?',
    lastActive: '1d ago',
    unread: 0
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      senderId: '1',
      receiverId: 'employer',
      content: 'Hello! I submitted my application for the Retail Associate position last week. I wanted to follow up and express my continued interest.',
      timestamp: '2023-11-10T10:30:00',
      isRead: true
    },
    {
      id: 'm2',
      senderId: 'employer',
      receiverId: '1',
      content: 'Hi Sarah, thank you for your application. We\'re reviewing candidates now and would like to schedule an interview with you.',
      timestamp: '2023-11-10T11:15:00',
      isRead: true
    },
    {
      id: 'm3',
      senderId: '1',
      receiverId: 'employer',
      content: 'That sounds great! I\'m available any day next week in the afternoons.',
      timestamp: '2023-11-10T11:30:00',
      isRead: true
    },
    {
      id: 'm4',
      senderId: 'employer',
      receiverId: '1',
      content: 'Perfect. How about Wednesday at 2pm at our main office?',
      timestamp: '2023-11-10T13:45:00',
      isRead: true
    },
    {
      id: 'm5',
      senderId: '1',
      receiverId: 'employer',
      content: 'Wednesday at 2pm works for me! Thank you for the interview opportunity!',
      timestamp: '2023-11-10T14:10:00',
      isRead: false
    },
    {
      id: 'm6',
      senderId: '1',
      receiverId: 'employer',
      content: 'Could you please send me the address for the interview?',
      timestamp: '2023-11-10T14:15:00',
      isRead: false
    }
  ]
};

const CandidateMessagingTab = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    // Get messages for this candidate
    setMessages(MOCK_MESSAGES[candidate.id] || []);
    
    // Mark messages as read
    const updatedCandidates = candidates.map(c => 
      c.id === candidate.id ? { ...c, unread: 0 } : c
    );
    setCandidates(updatedCandidates);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedCandidate) return;
    
    // Create new message
    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: 'employer',
      receiverId: selectedCandidate.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    // Add to messages
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // In a real app, this would be saved to the database
  };
  
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Candidate Messaging</CardTitle>
        </div>
        <CardDescription>
          Message candidates to coordinate hiring details
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          {/* Candidates sidebar */}
          <div className="border-r md:col-span-1">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(600px-57px)]">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`flex items-start p-3 gap-3 hover:bg-slate-50 cursor-pointer border-b ${
                      selectedCandidate?.id === candidate.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSelectCandidate(candidate)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{candidate.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{candidate.lastActive}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{candidate.jobTitle}</p>
                      {candidate.lastMessage && (
                        <p className="text-sm truncate">{candidate.lastMessage}</p>
                      )}
                    </div>
                    {candidate.unread && candidate.unread > 0 && (
                      <Badge className="bg-blue-500">{candidate.unread}</Badge>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-muted-foreground">No candidates match your search</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="md:col-span-2 flex flex-col h-full">
            {selectedCandidate ? (
              <>
                {/* Chat header */}
                <div className="p-3 border-b bg-white flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={selectedCandidate.avatar} />
                      <AvatarFallback>{selectedCandidate.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedCandidate.name}</h3>
                      <p className="text-xs text-muted-foreground">{selectedCandidate.jobTitle}</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mr-2">View Application</Button>
                    <Button size="sm">Schedule Interview</Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => {
                    const isSender = message.senderId === 'employer';
                    
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`
                            max-w-[80%] rounded-lg px-4 py-2 
                            ${isSender 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                            }
                          `}
                        >
                          <p className="break-words">{message.content}</p>
                          <div 
                            className={`
                              text-xs mt-1 flex justify-end items-center 
                              ${isSender ? 'text-blue-100' : 'text-gray-500'}
                            `}
                          >
                            {formatMessageTime(message.timestamp)}
                            {isSender && (
                              <CheckCircle className={`h-3 w-3 ml-1 ${message.isRead ? 'text-blue-200' : 'text-blue-300'}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Message input */}
                <div className="p-3 border-t bg-white">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type a message..."
                      className="flex-1 min-h-[80px]"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="self-end"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <MessageCircle className="h-12 w-12 text-blue-200 mb-4" />
                <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Select a candidate from the list to view your conversation history or start a new conversation
                </p>
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateMessagingTab;
