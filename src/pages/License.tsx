import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, School, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const License = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/07748c3e-c8ae-4f0e-a79d-89da75c12094.png" 
            alt="JS4HS Logo" 
            className="h-24 w-auto rounded-full"
            width="200"
            height="200"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-center">License Agreement</h1>
        
        <div className="max-w-4xl mx-auto mb-8 flex justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <a href="/license-agreement.pdf" download>Download Full License</a>
          </Button>
        </div>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Job Seekers 4 High Schools - Proprietary License</CardTitle>
            <CardDescription>Last Updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Ownership and Copyright</h2>
              <p>
                All content, features, and functionality of Job Seekers 4 High Schools application, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are owned by Job Seekers 4 High Schools and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">2. License </h2>
              <p>
                Job Seekers 4 High Schools grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the application for personal, non-commercial purposes. This license does not include any resale or commercial use of the application or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of the application or its contents; any downloading or copying of account information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Restrictions</h2>
              <p>
                You may not:
              </p>
              <ul className="list-disc pl-8 space-y-1">
                <li>Modify, reproduce, duplicate, copy, sell, resell, or exploit any portion of the application without express written permission from Job Seekers 4 High Schools.</li>
                <li>Use the application for any illegal or unauthorized purpose.</li>
                <li>Interfere with or disrupt the operation of the application or servers or networks connected to the application.</li>
                <li>Attempt to gain unauthorized access to any portion of the application, other accounts, computer systems, or networks connected to the application.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Licensing Options</h2>
              <div className="space-y-6">
                {/* Employer Licensing Section */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-muted">
                  <div className="flex items-start gap-3">
                    <Briefcase className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-lg">Employer Licensing</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        We offer different plans for employers to access premium features.
                      </p>
                      
                      <h4 className="font-medium mb-1">Available Plans:</h4>
                      <ul className="list-disc pl-8 mb-3 text-sm">
                        <li><span className="font-semibold">Basic:</span> Free forever - Essential job posting features</li>
                        <li><span className="font-semibold">Standard:</span> $59 per month - 5 premium job posts with branded profile</li>
                        <li><span className="font-semibold">Pro:</span> $149 per month - Unlimited premium postings with full analytics and featured badge</li>
                      </ul>
                      
                      <p className="text-sm">
                        For more information about employer plans, please visit our <Link to="/for-employers" className="text-primary hover:underline">Premium Services</Link> page.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Educational Institution Licensing */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-muted">
                  <div className="flex items-start gap-3">
                    <School className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-lg">School Licensing</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        We offer specialized licensing options for educational institutions.
                      </p>
                      
                      <h4 className="font-medium mb-1">Available Plans:</h4>
                      <ul className="list-disc pl-8 mb-3 text-sm">
                        <li><span className="font-semibold">Basic:</span> Free forever - Essential tools for school career counselors</li>
                        <li><span className="font-semibold">Premium:</span> $750 per year - Full suite of tools including counselor dashboard and analytics</li>
                        <li><span className="font-semibold">Enterprise:</span> $10 per student/year - Volume-based pricing for larger institutions</li>
                      </ul>
                      
                      <p className="text-sm">
                        For more information or to apply for an educational license, please contact our licensing team at <a href="mailto:education@jobseeker4hs.org" className="text-primary hover:underline">education@jobseeker4hs.org</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
              <p>
                This license is effective until terminated. Job Seekers 4 High Schools may terminate your access to the application at any time, without notice, for conduct that Job Seekers 4 High Schools believes violates this license or other applicable policies.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">6. Disclaimers and Limitations of Liability</h2>
              <p>
                THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. JOB SEEKERS 4 HIGH SCHOOLS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="mt-2">
                IN NO EVENT WILL JOB SEEKERS 4 HIGH SCHOOLS BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE APPLICATION, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, BUSINESS INTERRUPTION, OR LOSS OF INFORMATION.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">7. Contact Information</h2>
              <p>
                For any questions or concerns regarding this license, please contact us at: legal@jobseeker4hs.org
              </p>
            </section>
          </CardContent>
        </Card>
        
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            By continuing to use our application, you acknowledge that you have read, understood, and agree to be bound by the terms of this license agreement.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default License;
