
import { GuideSection } from './types';

export const guideSections: GuideSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: [
      {
        question: 'How do I create an account?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-blue-600">Creating Your Account</h4>
          <ol class="list-decimal list-inside space-y-2">
            <li>Visit our homepage and click "Sign Up"</li>
            <li>Choose your account type:
              <ul class="list-disc list-inside ml-4 mt-1">
                <li><strong>Student:</strong> For high school students seeking their first job</li>
                <li><strong>Employer:</strong> For businesses looking to hire motivated students</li>
                <li><strong>School:</strong> For educational institutions managing career programs</li>
              </ul>
            </li>
            <li>Fill in your basic information (name, email, password)</li>
            <li>Verify your email address through the confirmation link</li>
            <li>Complete your profile setup with additional details</li>
          </ol>
          <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
            <p class="text-sm"><strong>Tip:</strong> Use a school email address if available - it helps verify your student status and may provide access to additional features.</p>
          </div>
        </div>`
      },
      {
        question: 'What is a redemption code and how do I use it?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-green-600">Understanding Redemption Codes</h4>
          <p>Redemption codes provide special access to premium features and are typically distributed by schools or during special events.</p>
          
          <h5 class="font-medium">How to Use Your Code:</h5>
          <ol class="list-decimal list-inside space-y-2">
            <li>Click on your profile menu in the top right corner</li>
            <li>Select "Redeem Code" from the dropdown</li>
            <li>Enter your redemption code in the text field</li>
            <li>Click "Redeem" to activate your benefits</li>
          </ol>
          
          <div class="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
            <p class="text-sm"><strong>Benefits Include:</strong> Premium job matching, exclusive employer access, advanced career tools, and priority support.</p>
          </div>
        </div>`
      },
      {
        question: 'How do I set up my student profile?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-purple-600">Building Your Professional Profile</h4>
          
          <h5 class="font-medium">Essential Profile Sections:</h5>
          <ul class="list-disc list-inside space-y-2">
            <li><strong>Personal Information:</strong> Name, contact details, location</li>
            <li><strong>Education:</strong> School, grade level, graduation date, GPA (optional)</li>
            <li><strong>Skills & Interests:</strong> Technical skills, soft skills, career interests</li>
            <li><strong>Experience:</strong> Part-time jobs, volunteer work, school activities</li>
            <li><strong>Availability:</strong> Work schedule preferences, start date</li>
          </ul>
          
          <h5 class="font-medium">Profile Optimization Tips:</h5>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="bg-blue-50 p-3 rounded-lg">
              <h6 class="font-medium text-blue-800">✓ Do This</h6>
              <ul class="text-sm mt-1 space-y-1">
                <li>• Use a professional profile photo</li>
                <li>• Write a clear, enthusiastic bio</li>
                <li>• List relevant coursework</li>
                <li>• Include extracurricular activities</li>
              </ul>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
              <h6 class="font-medium text-red-800">✗ Avoid This</h6>
              <ul class="text-sm mt-1 space-y-1">
                <li>• Leaving sections blank</li>
                <li>• Using casual language</li>
                <li>• Providing incomplete contact info</li>
                <li>• Forgetting to update regularly</li>
              </ul>
            </div>
          </div>
        </div>`
      },
      {
        question: 'How do I navigate the platform?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-indigo-600">Platform Navigation Guide</h4>
          
          <h5 class="font-medium">Main Navigation Areas:</h5>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="bg-indigo-50 p-3 rounded-lg">
                <h6 class="font-medium text-indigo-800">🏠 Dashboard</h6>
                <p class="text-sm">Your personalized home base with quick actions and recommendations</p>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg">
                <h6 class="font-medium text-blue-800">💼 Jobs</h6>
                <p class="text-sm">Browse and search for job opportunities with advanced filters</p>
              </div>
              <div class="bg-green-50 p-3 rounded-lg">
                <h6 class="font-medium text-green-800">📋 Applications</h6>
                <p class="text-sm">Track your job applications and their current status</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h6 class="font-medium text-purple-800">👤 Profile</h6>
                <p class="text-sm">Manage your personal information and career preferences</p>
              </div>
              <div class="bg-amber-50 p-3 rounded-lg">
                <h6 class="font-medium text-amber-800">📚 Resources</h6>
                <p class="text-sm">Access career guidance, tools, and educational content</p>
              </div>
              <div class="bg-pink-50 p-3 rounded-lg">
                <h6 class="font-medium text-pink-800">🎯 First Job Toolkit</h6>
                <p class="text-sm">Step-by-step guidance for landing your first job</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <h6 class="font-medium">💡 Quick Tip</h6>
            <p class="text-sm">Use the search bar in the header to quickly find specific features, jobs, or information across the platform.</p>
          </div>
        </div>`
      }
    ]
  },
  {
    id: 'job-search',
    title: 'Job Search',
    content: [
      {
        question: 'How do I search for jobs?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-blue-600">Effective Job Search Strategies</h4>
          
          <h5 class="font-medium">Search Methods:</h5>
          <div class="grid md:grid-cols-3 gap-3">
            <div class="bg-blue-50 p-3 rounded-lg text-center">
              <div class="text-2xl mb-2">🔍</div>
              <h6 class="font-medium">Keyword Search</h6>
              <p class="text-sm">Use job titles, skills, or company names</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg text-center">
              <div class="text-2xl mb-2">📍</div>
              <h6 class="font-medium">Location Filter</h6>
              <p class="text-sm">Find jobs within your preferred distance</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg text-center">
              <div class="text-2xl mb-2">⚙️</div>
              <h6 class="font-medium">Advanced Filters</h6>
              <p class="text-sm">Filter by schedule, experience, and more</p>
            </div>
          </div>
          
          <h5 class="font-medium">Available Filters:</h5>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Job Type:</strong> Part-time, Full-time, Internship, Seasonal</li>
            <li><strong>Experience Level:</strong> Entry-level, Some experience required</li>
            <li><strong>Schedule:</strong> Weekends, Evenings, Flexible hours</li>
            <li><strong>Industry:</strong> Retail, Food Service, Healthcare, Technology</li>
            <li><strong>Distance:</strong> 5, 10, 25, 50+ miles from your location</li>
          </ul>
          
          <div class="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p class="text-sm"><strong>Pro Tip:</strong> Save your favorite searches to get notified when new matching jobs are posted!</p>
          </div>
        </div>`
      },
      {
        question: 'How does job matching work?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-green-600">Intelligent Job Matching</h4>
          <p>Our AI-powered matching system analyzes your profile to recommend the most suitable opportunities.</p>
          
          <h5 class="font-medium">Matching Criteria:</h5>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <div class="bg-green-50 p-3 rounded-lg">
                <h6 class="font-medium text-green-800">Skills & Interests</h6>
                <p class="text-sm">Matches jobs that align with your stated skills and career interests</p>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg">
                <h6 class="font-medium text-blue-800">Location & Availability</h6>
                <p class="text-sm">Considers your location preferences and available work schedule</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h6 class="font-medium text-purple-800">Experience Level</h6>
                <p class="text-sm">Recommends entry-level positions appropriate for first-time workers</p>
              </div>
              <div class="bg-amber-50 p-3 rounded-lg">
                <h6 class="font-medium text-amber-800">Career Goals</h6>
                <p class="text-sm">Suggests opportunities that support your long-term career aspirations</p>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">Match Quality Indicators:</h5>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <span class="w-3 h-3 bg-green-500 rounded-full"></span>
              <strong>Excellent Match (90-100%):</strong> Highly recommended based on your profile
            </li>
            <li class="flex items-center gap-2">
              <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
              <strong>Good Match (70-89%):</strong> Good alignment with your preferences
            </li>
            <li class="flex items-center gap-2">
              <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <strong>Fair Match (50-69%):</strong> Some alignment, worth considering
            </li>
          </ul>
        </div>`
      },
      {
        question: 'What information is shown for each job?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-purple-600">Job Listing Information</h4>
          
          <h5 class="font-medium">Essential Job Details:</h5>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h6 class="font-medium text-purple-800">📋 Basic Information</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Job title and department</li>
                  <li>• Company name and logo</li>
                  <li>• Location and distance</li>
                  <li>• Posted date</li>
                </ul>
              </div>
              <div class="bg-green-50 p-3 rounded-lg">
                <h6 class="font-medium text-green-800">💰 Compensation</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Hourly wage or salary range</li>
                  <li>• Benefits information</li>
                  <li>• Commission opportunities</li>
                  <li>• Performance bonuses</li>
                </ul>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-blue-50 p-3 rounded-lg">
                <h6 class="font-medium text-blue-800">⏰ Schedule Details</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Hours per week</li>
                  <li>• Available shifts</li>
                  <li>• Flexibility options</li>
                  <li>• Start date</li>
                </ul>
              </div>
              <div class="bg-amber-50 p-3 rounded-lg">
                <h6 class="font-medium text-amber-800">🎯 Requirements</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Required skills</li>
                  <li>• Experience level</li>
                  <li>• Education requirements</li>
                  <li>• Special certifications</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">Safety & Verification Badges:</h5>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">✓ Verified Employer</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">🛡️ Student-Safe Environment</span>
            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">📚 Learning Opportunities</span>
            <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">⭐ Top Employer</span>
          </div>
        </div>`
      },
      {
        question: 'How do I save jobs for later?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-pink-600">Managing Saved Jobs</h4>
          
          <h5 class="font-medium">How to Save Jobs:</h5>
          <ol class="list-decimal list-inside space-y-2">
            <li>Click the bookmark icon (💾) on any job listing</li>
            <li>The job will be automatically added to your "Saved Jobs" collection</li>
            <li>Access your saved jobs from the main navigation menu</li>
            <li>Review and organize your saved jobs anytime</li>
          </ol>
          
          <h5 class="font-medium">Saved Jobs Features:</h5>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="bg-pink-50 p-3 rounded-lg">
              <h6 class="font-medium text-pink-800">🗂️ Organization</h6>
              <ul class="text-sm mt-1 space-y-1">
                <li>• Sort by date saved, salary, or location</li>
                <li>• Filter by job type or industry</li>
                <li>• Add personal notes to each job</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <h6 class="font-medium text-blue-800">🔔 Notifications</h6>
              <ul class="text-sm mt-1 space-y-1">
                <li>• Get alerts when application deadlines approach</li>
                <li>• Notification if job requirements change</li>
                <li>• Alert if similar jobs become available</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p class="text-sm"><strong>Strategy Tip:</strong> Save 3-5 jobs at a time and apply to them in order of preference. This helps you stay organized and focused.</p>
          </div>
        </div>`
      }
    ]
  },
  {
    id: 'applications',
    title: 'Applications',
    content: [
      {
        question: 'How do I apply for a job?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-blue-600">Step-by-Step Application Process</h4>
          
          <h5 class="font-medium">Application Steps:</h5>
          <div class="space-y-3">
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h6 class="font-medium">Review Job Details</h6>
                <p class="text-sm text-gray-600">Carefully read the job description, requirements, and expectations</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h6 class="font-medium">Click "Apply Now"</h6>
                <p class="text-sm text-gray-600">Found on the job listing page or job detail view</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h6 class="font-medium">Complete Application Form</h6>
                <p class="text-sm text-gray-600">Fill in required information and answer any specific questions</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h6 class="font-medium">Submit & Track</h6>
                <p class="text-sm text-gray-600">Submit your application and monitor its status in your dashboard</p>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">Application Components:</h5>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Personal Information:</strong> Auto-filled from your profile</li>
            <li><strong>Resume/CV:</strong> Upload or use our resume builder</li>
            <li><strong>Cover Letter:</strong> Optional but recommended personalized message</li>
            <li><strong>Availability:</strong> Confirm your work schedule preferences</li>
            <li><strong>Additional Questions:</strong> Employer-specific questions</li>
          </ul>
          
          <div class="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
            <p class="text-sm"><strong>Success Tip:</strong> Customize your application for each job. Mention specific skills or experiences that match the job requirements.</p>
          </div>
        </div>`
      },
      {
        question: 'How can I track my applications?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-green-600">Application Tracking Dashboard</h4>
          
          <h5 class="font-medium">Application Status Types:</h5>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="space-y-2">
              <div class="flex items-center gap-2 bg-blue-50 p-2 rounded">
                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span class="font-medium text-blue-800">Submitted</span>
                <span class="text-sm text-gray-600">- Application received</span>
              </div>
              <div class="flex items-center gap-2 bg-yellow-50 p-2 rounded">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span class="font-medium text-yellow-800">Under Review</span>
                <span class="text-sm text-gray-600">- Being evaluated</span>
              </div>
              <div class="flex items-center gap-2 bg-purple-50 p-2 rounded">
                <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span class="font-medium text-purple-800">Interview Scheduled</span>
                <span class="text-sm text-gray-600">- Next step arranged</span>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 bg-green-50 p-2 rounded">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="font-medium text-green-800">Offer Extended</span>
                <span class="text-sm text-gray-600">- Job offer made</span>
              </div>
              <div class="flex items-center gap-2 bg-red-50 p-2 rounded">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <span class="font-medium text-red-800">Not Selected</span>
                <span class="text-sm text-gray-600">- Position filled</span>
              </div>
              <div class="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span class="font-medium text-gray-800">Withdrawn</span>
                <span class="text-sm text-gray-600">- You withdrew</span>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">Dashboard Features:</h5>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Real-time Updates:</strong> Automatic status notifications</li>
            <li><strong>Application History:</strong> Complete record of all applications</li>
            <li><strong>Interview Reminders:</strong> Calendar integration and alerts</li>
            <li><strong>Follow-up Suggestions:</strong> Guidance on when to follow up</li>
            <li><strong>Analytics:</strong> Track your application success rate</li>
          </ul>
          
          <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
            <p class="text-sm"><strong>Organization Tip:</strong> Use the notes feature to track interview feedback and follow-up actions for each application.</p>
          </div>
        </div>`
      },
      {
        question: 'What should I include in my application?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-purple-600">Creating Winning Applications</h4>
          
          <h5 class="font-medium">Essential Application Elements:</h5>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h6 class="font-medium text-purple-800">📄 Resume/CV</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Contact information</li>
                  <li>• Education and coursework</li>
                  <li>• Work experience (any level)</li>
                  <li>• Skills and achievements</li>
                  <li>• Volunteer work and activities</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg">
                <h6 class="font-medium text-blue-800">💌 Cover Letter</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Why you want this specific job</li>
                  <li>• Relevant skills and experiences</li>
                  <li>• Enthusiasm and motivation</li>
                  <li>• Professional yet personal tone</li>
                </ul>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-green-50 p-3 rounded-lg">
                <h6 class="font-medium text-green-800">🕐 Availability</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Days of the week you can work</li>
                  <li>• Preferred hours and shifts</li>
                  <li>• Start date availability</li>
                  <li>• Any scheduling restrictions</li>
                </ul>
              </div>
              <div class="bg-amber-50 p-3 rounded-lg">
                <h6 class="font-medium text-amber-800">📝 Additional Info</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• References (if requested)</li>
                  <li>• Work permits or eligibility</li>
                  <li>• Transportation arrangements</li>
                  <li>• Special skills or certifications</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">First-Time Applicant Tips:</h5>
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <span class="text-green-500 font-bold">✓</span>
                <span class="text-sm"><strong>Highlight transferable skills</strong> from school projects, sports, or volunteer work</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 font-bold">✓</span>
                <span class="text-sm"><strong>Show enthusiasm</strong> for learning and growing in the role</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 font-bold">✓</span>
                <span class="text-sm"><strong>Mention your reliability</strong> and commitment to work-life balance</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 font-bold">✓</span>
                <span class="text-sm"><strong>Include academic achievements</strong> that demonstrate work ethic</span>
              </li>
            </ul>
          </div>
        </div>`
      }
    ]
  },
  {
    id: 'career-tools',
    title: 'Career Tools',
    content: [
      {
        question: 'What is the First Job Toolkit?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-gradient bg-gradient-to-r from-blue-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">First Job Toolkit Overview</h4>
          <p>A comprehensive 6-step guided program designed to help high school students successfully land and thrive in their first job.</p>
          
          <h5 class="font-medium">Toolkit Steps:</h5>
          <div class="space-y-3">
            <div class="flex gap-3 items-start bg-blue-50 p-3 rounded-lg">
              <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h6 class="font-medium text-blue-800">Profile Setup</h6>
                <p class="text-sm">Create a complete profile to showcase your skills and experience</p>
              </div>
            </div>
            <div class="flex gap-3 items-start bg-green-50 p-3 rounded-lg">
              <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h6 class="font-medium text-green-800">Resume Builder</h6>
                <p class="text-sm">Build a professional resume that stands out to employers</p>
              </div>
            </div>
            <div class="flex gap-3 items-start bg-purple-50 p-3 rounded-lg">
              <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h6 class="font-medium text-purple-800">Job Search Strategy</h6>
                <p class="text-sm">Learn effective job search strategies for entry-level positions</p>
              </div>
            </div>
            <div class="flex gap-3 items-start bg-amber-50 p-3 rounded-lg">
              <div class="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h6 class="font-medium text-amber-800">Interview Preparation</h6>
                <p class="text-sm">Practice and prepare for your upcoming interviews</p>
              </div>
            </div>
            <div class="flex gap-3 items-start bg-indigo-50 p-3 rounded-lg">
              <div class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div>
                <h6 class="font-medium text-indigo-800">First Job Success</h6>
                <p class="text-sm">Tips and resources for success in your first job</p>
              </div>
            </div>
            <div class="flex gap-3 items-start bg-pink-50 p-3 rounded-lg">
              <div class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
              <div>
                <h6 class="font-medium text-pink-800">Career Badges</h6>
                <p class="text-sm">Earn badges through quizzes and employer endorsements to showcase your skills</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border-l-4 border-blue-400">
            <p class="text-sm"><strong>🎉 Interactive Experience:</strong> The toolkit includes progress tracking, confetti celebrations, and step-by-step guidance to keep you motivated throughout your job search journey!</p>
          </div>
          
          <div class="text-center mt-4">
            <a href="/first-job-toolkit" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
              🚀 Start Your Toolkit Journey
            </a>
          </div>
        </div>`
      },
      {
        question: 'How do I use the resume builder?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-green-600">Building Your First Resume</h4>
          
          <h5 class="font-medium">Resume Builder Features:</h5>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="bg-green-50 p-3 rounded-lg">
                <h6 class="font-medium text-green-800">📝 Guided Sections</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Personal information</li>
                  <li>• Education and coursework</li>
                  <li>• Work experience</li>
                  <li>• Skills and achievements</li>
                  <li>• Activities and volunteer work</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg">
                <h6 class="font-medium text-blue-800">🎨 Professional Templates</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Multiple design options</li>
                  <li>• Student-friendly layouts</li>
                  <li>• ATS-optimized formats</li>
                  <li>• One-page optimization</li>
                </ul>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h6 class="font-medium text-purple-800">💡 Smart Suggestions</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• Action verb recommendations</li>
                  <li>• Skill keyword suggestions</li>
                  <li>• Achievement quantification</li>
                  <li>• Industry-specific tips</li>
                </ul>
              </div>
              <div class="bg-amber-50 p-3 rounded-lg">
                <h6 class="font-medium text-amber-800">📄 Export Options</h6>
                <ul class="text-sm mt-1 space-y-1">
                  <li>• PDF download</li>
                  <li>• Multiple format options</li>
                  <li>• Easy sharing capabilities</li>
                  <li>• Version control</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">Step-by-Step Process:</h5>
          <ol class="list-decimal list-inside space-y-2">
            <li>Navigate to the Resume Assistant from the Resources page</li>
            <li>Choose a professional template that fits your style</li>
            <li>Fill in each section with guided prompts and examples</li>
            <li>Review and edit your content with our optimization suggestions</li>
            <li>Download your completed resume as a PDF</li>
          </ol>
          
          <div class="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p class="text-sm"><strong>First-Timer Tip:</strong> Don't worry if you have limited work experience. Focus on school achievements, volunteer work, and transferable skills from activities and coursework.</p>
          </div>
        </div>`
      },
      {
        question: 'What career assessment tools are available?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-indigo-600">Career Discovery Tools</h4>
          
          <h5 class="font-medium">Available Assessments:</h5>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="bg-indigo-50 p-3 rounded-lg">
                <h6 class="font-medium text-indigo-800">🧭 Career Quiz</h6>
                <p class="text-sm">Interactive quiz to discover career paths that match your interests and personality</p>
                <ul class="text-xs mt-2 space-y-1">
                  <li>• 15-20 engaging questions</li>
                  <li>• Personality-based matching</li>
                  <li>• Multiple career suggestions</li>
                  <li>• Industry insights</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg">
                <h6 class="font-medium text-blue-800">🎯 Skills Assessment</h6>
                <p class="text-sm">Evaluate your current skills and identify areas for development</p>
                <ul class="text-xs mt-2 space-y-1">
                  <li>• Technical skills evaluation</li>
                  <li>• Soft skills assessment</li>
                  <li>• Personalized recommendations</li>
                  <li>• Growth planning</li>
                </ul>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h6 class="font-medium text-purple-800">📊 Personalized Assessment</h6>
                <p class="text-sm">Comprehensive evaluation combining interests, skills, and goals</p>
                <ul class="text-xs mt-2 space-y-1">
                  <li>• Multi-factor analysis</li>
                  <li>• Detailed career reports</li>
                  <li>• Learning path suggestions</li>
                  <li>• Long-term planning</li>
                </ul>
              </div>
              <div class="bg-green-50 p-3 rounded-lg">
                <h6 class="font-medium text-green-800">🚀 Job Simulations</h6>
                <p class="text-sm">Experience different careers through interactive simulations</p>
                <ul class="text-xs mt-2 space-y-1">
                  <li>• Real-world scenarios</li>
                  <li>• Task-based learning</li>
                  <li>• Industry exposure</li>
                  <li>• Skill building</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">Assessment Benefits:</h5>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Self-Discovery:</strong> Better understanding of your interests and strengths</li>
            <li><strong>Career Exploration:</strong> Learn about various career options and requirements</li>
            <li><strong>Goal Setting:</strong> Create actionable plans for skill development</li>
            <li><strong>Job Matching:</strong> Improved job recommendations based on assessment results</li>
          </ul>
          
          <div class="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400">
            <p class="text-sm"><strong>Getting Started:</strong> Take the Career Quiz first for a quick overview, then use the Personalized Assessment for detailed insights into your career path.</p>
          </div>
        </div>`
      },
      {
        question: 'How do job simulations work?',
        answer: `<div class="space-y-4">
          <h4 class="font-semibold text-amber-600">Interactive Job Simulations</h4>
          <p>Experience different careers through realistic, interactive scenarios that help you understand what various jobs actually involve.</p>
          
          <h5 class="font-medium">Simulation Categories:</h5>
          <div class="grid md:grid-cols-3 gap-3">
            <div class="bg-blue-50 p-3 rounded-lg text-center">
              <div class="text-2xl mb-2">🛍️</div>
              <h6 class="font-medium text-blue-800">Retail & Service</h6>
              <p class="text-xs">Customer service, sales, inventory management</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg text-center">
              <div class="text-2xl mb-2">🏥</div>
              <h6 class="font-medium text-green-800">Healthcare</h6>
              <p class="text-xs">Patient care, medical administration, lab work</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg text-center">
              <div class="text-2xl mb-2">💻</div>
              <h6 class="font-medium text-purple-800">Technology</h6>
              <p class="text-xs">Programming, IT support, digital marketing</p>
            </div>
          </div>
          
          <h5 class="font-medium">How Simulations Work:</h5>
          <div class="space-y-3">
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h6 class="font-medium">Choose Your Career</h6>
                <p class="text-sm text-gray-600">Select from available job simulations in different industries</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h6 class="font-medium">Complete Tasks</h6>
                <p class="text-sm text-gray-600">Work through realistic scenarios and challenges</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h6 class="font-medium">Receive Feedback</h6>
                <p class="text-sm text-gray-600">Get instant feedback on your performance and decisions</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <div class="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h6 class="font-medium">Earn Recognition</h6>
                <p class="text-sm text-gray-600">Complete simulations to earn skill badges and certificates</p>
              </div>
            </div>
          </div>
          
          <h5 class="font-medium">Simulation Features:</h5>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Realistic Scenarios:</strong> Based on actual workplace situations</li>
            <li><strong>Adaptive Learning:</strong> Difficulty adjusts to your performance</li>
            <li><strong>Progress Tracking:</strong> Monitor your skill development over time</li>
            <li><strong>Career Insights:</strong> Learn about salary, growth, and requirements</li>
          </ul>
        </div>`
      }
    ]
  }
];
