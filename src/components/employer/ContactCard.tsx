
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Briefcase, Shield, AlertTriangle } from 'lucide-react';

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
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-green-100">
              <Shield className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h4 className="font-medium">Security Notice</h4>
              <p className="text-sm text-muted-foreground">
                This is an official contact channel. Be wary of communication from other sources claiming to represent our program.
              </p>
            </div>
          </div>
          
          <div className="mt-3 bg-amber-50 p-3 rounded-md border border-amber-200 text-amber-800 text-xs">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Security Alert</p>
                <p>If you receive suspicious communications or requests for payment/personal information, please report it immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
