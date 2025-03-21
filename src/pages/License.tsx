
import React from 'react';
import Layout from '@/components/Layout';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const License = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">License Information</h1>
        
        <Alert className="mb-8 bg-amber-50 border-amber-200">
          <Shield className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Proprietary Software</AlertTitle>
          <AlertDescription className="text-amber-700">
            This application is proprietary software exclusively licensed to Westside High School Entrepreneurship Academy.
          </AlertDescription>
        </Alert>
        
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold mt-6 mb-4">Job Seekers 4 High Schools - Proprietary License</h2>
          
          <p className="mb-4">© {currentYear} Job Seekers 4 High Schools</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">1. License Grant</h3>
          <p className="mb-4">
            This is proprietary software exclusively licensed to Westside High School Entrepreneurship Academy. 
            Any use, reproduction, modification, or distribution of this software without express written permission 
            is strictly prohibited.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">2. Ownership</h3>
          <p className="mb-4">
            All intellectual property rights in the software and content, including but not limited to copyright, 
            patents, trademarks, and trade secrets, are owned by Job Seekers 4 High Schools.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">3. Restrictions</h3>
          <p className="mb-4">
            You may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Copy, reproduce, distribute, or transfer the software to any third party</li>
            <li>Modify, adapt, translate, or create derivative works based upon the software</li>
            <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code</li>
            <li>Remove any proprietary notices or labels on the software</li>
            <li>Use the software for any commercial purpose beyond the scope of Westside High School Entrepreneurship Academy</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">4. Licensing for Educational Institutions</h3>
          <p className="mb-4">
            Educational institutions interested in licensing this software should contact:
            <br />
            <a href="mailto:licensing@jobseekers4highschools.com" className="text-primary hover:underline">
              licensing@jobseekers4highschools.com
            </a>
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">5. Warranty Disclaimer</h3>
          <p className="mb-4">
            THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
            INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
            PURPOSE AND NONINFRINGEMENT.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">6. Limitation of Liability</h3>
          <p className="mb-4">
            IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR 
            OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">7. Termination</h3>
          <p className="mb-4">
            This license is effective until terminated. It will terminate automatically if you fail 
            to comply with any of the terms and conditions of this license.
          </p>
          
          <div className="bg-gray-100 p-6 rounded-lg mt-8 border border-gray-200">
            <h3 className="text-xl font-medium mb-3">Contact Information</h3>
            <p className="mb-2">
              For licensing inquiries, please contact:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:licensing@jobseekers4highschools.com" className="text-primary hover:underline">licensing@jobseekers4highschools.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default License;
