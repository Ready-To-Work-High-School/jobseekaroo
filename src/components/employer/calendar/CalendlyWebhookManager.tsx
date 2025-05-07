
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Bell } from 'lucide-react';

interface WebhookEvent {
  id: string;
  name: string;
  description: string;
}

interface WebhookFormProps {
  onSubmit: (url: string, events: string[]) => void;
  onCancel: () => void;
}

const availableEvents: WebhookEvent[] = [
  {
    id: "invitee.created",
    name: "Invitee Created",
    description: "When someone schedules a meeting"
  },
  {
    id: "invitee.canceled",
    name: "Invitee Canceled",
    description: "When someone cancels a meeting"
  },
  {
    id: "invitee.rescheduled",
    name: "Invitee Rescheduled",
    description: "When someone reschedules a meeting"
  },
  {
    id: "routing_form.submission_created",
    name: "Form Submission",
    description: "When a routing form is submitted"
  }
];

const WebhookForm = ({ onSubmit, onCancel }: WebhookFormProps) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['invitee.created']);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter a valid webhook URL",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedEvents.length === 0) {
      toast({
        title: "No Events Selected",
        description: "Please select at least one event type",
        variant: "destructive"
      });
      return;
    }
    
    // Validate URL format
    try {
      new URL(webhookUrl);
      onSubmit(webhookUrl, selectedEvents);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL with http:// or https:// prefix",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="webhook-url">Webhook URL</Label>
        <Input 
          id="webhook-url"
          type="url"
          placeholder="https://your-app.com/api/webhook"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          required
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          This endpoint must be publicly accessible and able to receive POST requests.
        </p>
      </div>
      
      <div className="space-y-3">
        <Label>Select Events to Subscribe</Label>
        
        <div className="space-y-2">
          {availableEvents.map((event) => (
            <div key={event.id} className="flex items-start space-x-2">
              <Checkbox 
                id={`event-${event.id}`}
                checked={selectedEvents.includes(event.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedEvents(prev => [...prev, event.id]);
                  } else {
                    setSelectedEvents(prev => prev.filter(id => id !== event.id));
                  }
                }}
              />
              <div className="grid gap-1.5">
                <Label 
                  htmlFor={`event-${event.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {event.name}
                </Label>
                <p className="text-xs text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Webhook
        </Button>
      </div>
    </form>
  );
};

interface Webhook {
  uri: string;
  callback_url: string;
  events: string[];
  created_at: string;
}

interface CalendlyWebhookManagerProps {
  webhooks: Webhook[];
  onDelete: (webhookUri: string) => void;
  onCreate: (url: string, events: string[]) => void;
}

const CalendlyWebhookManager = ({ 
  webhooks, 
  onDelete,
  onCreate
}: CalendlyWebhookManagerProps) => {
  const [isCreating, setIsCreating] = useState(false);
  
  const handleSubmit = (url: string, events: string[]) => {
    onCreate(url, events);
    setIsCreating(false);
  };
  
  const handleCancel = () => {
    setIsCreating(false);
  };
  
  if (isCreating) {
    return (
      <Card className="border-primary/20">
        <CardContent className="p-4 pt-6">
          <WebhookForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    );
  }
  
  if (!webhooks.length) {
    return (
      <div className="text-center py-8">
        <Bell className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">No Webhook Subscriptions</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Set up webhooks to get notified in real-time when events are scheduled, canceled, or updated.
        </p>
        <Button onClick={() => setIsCreating(true)}>
          Add Webhook
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="space-y-4 mb-6">
        {webhooks.map((webhook) => (
          <Card key={webhook.uri} className="border-muted hover:border-muted-foreground/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">Callback URL</h4>
                  <a 
                    href={webhook.callback_url} 
                    className="text-primary text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {webhook.callback_url}
                  </a>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDelete(webhook.uri)}
                >
                  Remove
                </Button>
              </div>
              
              <div className="mt-3">
                <h4 className="text-xs font-medium text-muted-foreground mb-1">Events</h4>
                <div className="flex flex-wrap gap-1">
                  {webhook.events.map(event => (
                    <span key={event} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={() => setIsCreating(true)}>
          Add Webhook
        </Button>
      </div>
    </div>
  );
};

export default CalendlyWebhookManager;

