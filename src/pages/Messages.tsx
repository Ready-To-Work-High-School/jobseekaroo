
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, Send } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Mock data for conversations
  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson - HR Manager',
      company: 'Tech Solutions Inc',
      lastMessage: 'Thank you for your application! We\'d like to schedule an interview.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      name: 'Mike Chen - Store Manager',
      company: 'Retail Plus',
      lastMessage: 'Great to meet you yesterday. Looking forward to having you on the team!',
      time: '1 day ago',
      unread: false
    },
    {
      id: '3',
      name: 'Lisa Davis - Recruiter',
      company: 'Healthcare Partners',
      lastMessage: 'Hi! I saw your profile and think you might be a great fit for our internship program.',
      time: '3 days ago',
      unread: true
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Helmet>
        <title>Messages - Job Seekers 4 HS</title>
        <meta name="description" content="Manage your messages with employers and stay connected throughout your job search." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Conversations
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-medium text-sm ${conversation.unread ? 'font-bold' : ''}`}>
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{conversation.company}</p>
                        <p className={`text-sm text-gray-500 truncate ${conversation.unread ? 'font-medium' : ''}`}>
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message View */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                {selectedConversation ? (
                  <>
                    <CardHeader className="border-b">
                      <CardTitle>
                        {conversations.find(c => c.id === selectedConversation)?.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {conversations.find(c => c.id === selectedConversation)?.company}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {/* Sample messages */}
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Hi! Thanks for applying to our position. We'd love to learn more about you.</p>
                            <span className="text-xs text-gray-500 mt-1 block">Yesterday, 2:30 PM</span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Thank you for reaching out! I'm very excited about this opportunity.</p>
                            <span className="text-xs text-blue-100 mt-1 block">Yesterday, 3:15 PM</span>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                            <p className="text-sm">{conversations.find(c => c.id === selectedConversation)?.lastMessage}</p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {conversations.find(c => c.id === selectedConversation)?.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          className="flex-1"
                        />
                        <Button size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a conversation to start messaging</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
