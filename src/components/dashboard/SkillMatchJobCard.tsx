
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/types/job";
import { ExternalLink, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SkillMatchJobCardProps {
  job: Job;
  matchScore: number;
  matchedSkills: string[];
}

export default function SkillMatchJobCard({ job, matchScore, matchedSkills }: SkillMatchJobCardProps) {
  // Safely access properties with null checks
  const jobTitle = job?.title || "Untitled Position";
  const companyName = job?.company?.name || "Unknown Company";
  const jobDescription = job?.description || "No description available";
  const jobId = job?.id || "";
  
  // Determine color based on match percentage
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-emerald-500";
    if (score >= 40) return "bg-amber-500";
    if (score >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className="h-full transition-all hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">{jobTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">{companyName}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="font-mono">
              {matchScore}% match
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-1 mb-3">
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Skills match</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full mt-1.5">
            <div 
              className={cn("h-2 rounded-full", getScoreColor(matchScore))} 
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        {matchedSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 my-2">
            {matchedSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {jobDescription}
        </p>
      </CardContent>
      <CardFooter className="pt-1">
        <Link to={`/jobs/${jobId}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="h-3.5 w-3.5 mr-2" />
            View Job
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
