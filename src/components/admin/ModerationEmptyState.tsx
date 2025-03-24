
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ModerationEmptyState = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center h-64 p-6 text-center">
        <Badge variant="secondary" className="mb-4">All Clear</Badge>
        <h3 className="text-lg font-medium">No messages pending moderation</h3>
        <p className="text-muted-foreground mt-2">
          All messages have been reviewed
        </p>
      </CardContent>
    </Card>
  );
};
