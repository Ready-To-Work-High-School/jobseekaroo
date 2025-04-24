
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Shield, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmployerAdditionalFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <CardTitle>Analytics Dashboard</CardTitle>
          </div>
          <CardDescription>Measure recruitment performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Gain valuable insights into your recruitment efforts:</p>
          <ul className="space-y-2">
            {["View job posting performance metrics",
              "Track applicant sources and conversion rates",
              "Compare hiring efficiency over time",
              "Premium reports and insights"].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full">
            <Link to="/employer/analytics">View Analytics</Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <CardTitle>Compliance & Best Practices</CardTitle>
          </div>
          <CardDescription>Ensuring proper youth employment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>We help you navigate the requirements of employing young workers:</p>
          <ul className="space-y-2">
            {["Guidance on youth labor laws",
              "Work permit requirements by location",
              "Best practices for managing young employees",
              "Mentorship program guidance"].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full">
            <Link to="/resources">Compliance Resources</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerAdditionalFeatures;
