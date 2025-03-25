
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Briefcase } from 'lucide-react';

const ContactCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get In Touch</CardTitle>
        <CardDescription>
          Contact us to learn more about our programs and how to connect with our students.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-blue-100">
            <Building className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h4 className="font-medium">Westside High School Entrepreneurship & Nursing Academy</h4>
            <p className="text-muted-foreground">Jacksonville, Florida</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-blue-100">
            <Mail className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h4 className="font-medium">Email</h4>
            <a href="mailto:Colemanp3@duvalschools.org" className="text-blue-600 hover:underline">
              Colemanp3@duvalschools.org
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-blue-100">
            <Briefcase className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h4 className="font-medium">Program Director</h4>
            <p className="text-muted-foreground">Ms. Pamela Coleman</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
