
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          <p className="mb-4">
            Schedule a one-on-one meeting with Ms. Coleman, our Entrepreneurship Academy director,
            for personalized guidance on your career path.
          </p>
          <Button variant="default" asChild>
            <a href="mailto:Colemanp3@duvalschools.org">
              Request a Meeting
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingRequestCard;
