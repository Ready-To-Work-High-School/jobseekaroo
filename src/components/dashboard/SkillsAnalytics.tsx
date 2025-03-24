
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSkills } from "@/contexts/SkillsContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { UserSkill } from "@/types/skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Target, Award } from "lucide-react";

export default function SkillsAnalytics() {
  const { skills } = useSkills();

  if (!skills || skills.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills Analysis</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-6 text-center">
          <p className="text-muted-foreground">No skills added yet. Add skills to see analytics.</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for skill proficiency chart
  const skillProficiencyData = skills.map(skill => ({
    name: skill.skill_name,
    value: skill.proficiency_level,
    color: getColorForSkill(skill),
    isLearning: skill.is_learning,
  }));

  // Prepare data for learning vs mastered chart
  const skillStatusData = [
    {
      name: "Learning",
      value: skills.filter(skill => skill.is_learning).length,
      color: "#3b82f6"
    },
    {
      name: "Mastered",
      value: skills.filter(skill => !skill.is_learning).length,
      color: "#10b981"
    }
  ];

  // Prepare data for proficiency distribution
  const proficiencyDistribution = [
    { name: "Beginner (1)", value: skills.filter(s => s.proficiency_level === 1).length, color: "#ef4444" },
    { name: "Elementary (2)", value: skills.filter(s => s.proficiency_level === 2).length, color: "#f97316" },
    { name: "Intermediate (3)", value: skills.filter(s => s.proficiency_level === 3).length, color: "#eab308" },
    { name: "Advanced (4)", value: skills.filter(s => s.proficiency_level === 4).length, color: "#22c55e" },
    { name: "Expert (5)", value: skills.filter(s => s.proficiency_level === 5).length, color: "#3b82f6" }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Skills Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="proficiency">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="proficiency">Proficiency</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="proficiency" className="pt-4">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillProficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tick={{ fill: '#888888' }} />
                  <YAxis domain={[0, 5]} fontSize={12} tick={{ fill: '#888888' }} />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `Level: ${value}${props.payload.isLearning ? ' (Learning)' : ''}`,
                      props.payload.name
                    ]}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {skillProficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="pt-4">
            <div className="h-[220px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} skills`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution" className="pt-4">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={proficiencyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tick={{ fill: '#888888' }} />
                  <YAxis fontSize={12} tick={{ fill: '#888888' }} />
                  <Tooltip 
                    formatter={(value) => [`${value} skills`, "Count"]}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {proficiencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Helper function to get color based on skill level and learning status
function getColorForSkill(skill: UserSkill): string {
  if (skill.is_learning) {
    return "#3b82f6"; // blue for learning skills
  }
  
  // Color scale based on proficiency
  switch (skill.proficiency_level) {
    case 1: return "#ef4444"; // red
    case 2: return "#f97316"; // orange
    case 3: return "#eab308"; // yellow
    case 4: return "#22c55e"; // green
    case 5: return "#3b82f6"; // blue
    default: return "#94a3b8"; // slate
  }
}
