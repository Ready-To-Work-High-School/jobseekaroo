
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CalendlyEmbed from "@/components/calendly/CalendlyEmbed";

const MeetingRequestCard = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Meeting</CardTitle>
          <CardDescription>
            Get personalized assistance with your job search or career questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CalendlyEmbed className="rounded-lg shadow-sm" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingRequestCard;
