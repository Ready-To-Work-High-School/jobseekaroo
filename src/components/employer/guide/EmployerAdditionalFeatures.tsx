
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const EmployerAdditionalFeatures = () => {
  const additionalFeatures = [
    {
      title: "Candidate Matching",
      description: "Our AI system matches candidates to job requirements based on skills, experience, and preferences."
    },
    {
      title: "Interview Scheduling",
      description: "Streamline your hiring process with our integrated interview scheduling system."
    },
    {
      title: "Compliance Assistance",
      description: "Tools to ensure compliance with youth labor laws and regulations when hiring students."
    },
    {
      title: "Analytics Dashboard",
      description: "Track application metrics and optimize your recruitment strategy with data-driven insights."
    },
    {
      title: "School Partnerships",
      description: "Connect directly with local schools to establish recruitment pipelines and internship programs."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto my-12">
      <h3 className="text-2xl font-bold mb-6">Additional Platform Features</h3>
      
      <div className="space-y-4">
        {additionalFeatures.map((feature, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployerAdditionalFeatures;
