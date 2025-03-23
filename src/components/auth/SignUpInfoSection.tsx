
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, GraduationCap, Building } from "lucide-react";

const SignUpInfoSection = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <Card className="border-2 border-secondary/30 bg-secondary/10 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Exclusively for Westside High</span>
              </h3>
              <p className="text-muted-foreground mb-4">
                This platform is specifically designed for Westside High School students, 
                educators, and partnering employers to create meaningful career connections.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 mt-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Career Development</span>
              </h3>
              <p className="text-muted-foreground">
                Access resources, training opportunities, and mentorship to 
                develop skills that prepare you for future career success.
              </p>
            </div>
            
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>For Students</span>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Discover job opportunities tailored to your skills</li>
                  <li>• Build your professional profile and resume</li>
                  <li>• Connect with local employers for internships</li>
                  <li>• Track your career development progress</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span>For Employers</span>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Connect with qualified student talent</li>
                  <li>• Create customized job postings</li>
                  <li>• Participate in school career events</li>
                  <li>• Build your employer brand with students</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Accent line at the bottom */}
          <div className="mt-6 pt-4 border-t border-secondary/30 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Join our community to explore opportunities and build your future career path
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpInfoSection;
