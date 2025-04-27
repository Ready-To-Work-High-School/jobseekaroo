
import { GuideSection } from "./types";

export const guideSections: GuideSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: [
      { 
        question: 'What is Job Seekers 4 HS?',
        answer: 'Job Seekers 4 HS is a platform designed to connect high school students with job opportunities, career resources, and skill development tools. It helps students prepare for their future careers while providing employers with access to young talent.'
      },
      { 
        question: 'How do I create an account?',
        answer: 'Step 1: Navigate to the homepage and click on the "Sign Up" button in the top right corner.\nStep 2: Select your user type (Student, Employer, Teacher, or School Administrator).\nStep 3: Fill out the registration form with your personal details and email address.\nStep 4: Create a secure password following our guidelines.\nStep 5: Verify your email address by clicking the link sent to your inbox.\nStep 6: Complete your profile by adding additional information specific to your user type.'
      },
      { 
        question: 'What user types are available?',
        answer: 'The platform supports multiple user types, each with specific features:\n• Students: Access job listings, resume building tools, and career resources\n• Employers: Post jobs, review applications, and connect with qualified candidates\n• Teachers: Access curriculum resources and track student progress\n• School Administrators: Manage school integration and monitor student engagement\n• Counselors: Access specialized tools for career guidance and student development'
      },
      { 
        question: 'Is the platform free to use?',
        answer: 'The platform offers both free and premium options:\n• For Students: Completely free access to all core features\n• For Schools: Basic features are free, with premium features requiring a subscription\n• For Employers: Basic job postings are free, with enhanced features available through premium packages\n• Premium features include advanced analytics, priority listing, customization options, and enhanced support'
      },
      {
        question: 'How to navigate the platform?',
        answer: 'Step 1: Familiarize yourself with the main navigation bar at the top of the page, which includes links to Jobs, Resources, Dashboard, and more.\nStep 2: Use your personalized dashboard as your home base. It displays relevant information based on your user type.\nStep 3: Explore the sidebar menu for additional features and settings specific to your user type.\nStep 4: Use the search functionality to find specific content across the platform.\nStep 5: Access your account settings through the profile icon in the top right corner.\nStep 6: Use the Help button (question mark icon) for contextual guidance throughout the platform.'
      }
    ]
  },
  {
    id: 'student-features',
    title: 'Student Features',
    content: [
      { 
        question: 'How do I search for jobs?',
        answer: 'Step 1: Navigate to the Jobs page from the main navigation or dashboard.\nStep 2: Enter keywords related to your job interests in the search bar.\nStep 3: Use the filters panel to narrow results by location (ZIP code), distance, job type, and more.\nStep 4: Review the job listings that match your search criteria.\nStep 5: Click on any job title to view the full details.\nStep 6: Save interesting jobs for later by clicking the bookmark icon.\nStep 7: Apply directly through the platform using the "Apply Now" button.'
      },
      { 
        question: 'How do I build a resume?',
        answer: 'Step 1: Go to the Resources section and select "Resume Assistant".\nStep 2: Choose a professional template suitable for high school students.\nStep 3: Fill out the guided form with your personal information, education, work experience, and skills.\nStep 4: Add any volunteer work, extracurricular activities, or relevant achievements.\nStep 5: Preview your resume and make any necessary adjustments.\nStep 6: Export your completed resume as a PDF or Word document.\nStep 7: Use the AI feedback feature to receive suggestions for improvement.'
      },
      { 
        question: 'How do I track job applications?',
        answer: 'Step 1: Log into your account and navigate to the Dashboard.\nStep 2: Select the Applications tab to view all your job applications.\nStep 3: Each application will display its current status (Applied, Interviewing, Offered, Accepted, Rejected).\nStep 4: Click on any application to view detailed information and communication history.\nStep 5: Add notes to keep track of important details about each application.\nStep 6: Set reminders for follow-ups or interview dates.\nStep 7: Filter applications by status, date, or company to easily find what you\'re looking for.'
      },
      { 
        question: 'How do I develop my skills?',
        answer: 'Step 1: Navigate to the Skills Development section from your dashboard.\nStep 2: Complete the skills assessment to identify your current abilities and areas for improvement.\nStep 3: Review your personalized skill development plan.\nStep 4: Access recommended learning resources tailored to your needs.\nStep 5: Complete online courses, tutorials, and interactive exercises.\nStep 6: Earn skill badges as you master new abilities.\nStep 7: Track your progress through the skills dashboard.\nStep 8: Add verified skills to your profile and resume.'
      },
      { 
        question: 'How do I prepare for interviews?',
        answer: 'Step 1: Access the Interview Preparation resources in the Resources section.\nStep 2: Review the interview basics guide for fundamental techniques.\nStep 3: Practice with industry-specific questions relevant to your job interests.\nStep 4: Use the AI Interview Simulator to conduct mock interviews.\nStep 5: Record and review your practice interviews to identify areas for improvement.\nStep 6: Study the feedback provided after each practice session.\nStep 7: Access tips for proper interview attire, body language, and follow-up etiquette.\nStep 8: Schedule a session with a career counselor for personalized guidance.'
      },
      { 
        question: 'How do I get career guidance?',
        answer: 'Step 1: Take the Career Interest Quiz to discover potential career paths that match your interests and strengths.\nStep 2: Explore the Career Explorer tool to learn about different industries, roles, and required qualifications.\nStep 3: Participate in virtual job shadowing experiences to get first-hand exposure to different careers.\nStep 4: Connect with mentors in your fields of interest through the platform\'s mentorship program.\nStep 5: Attend virtual career fairs and informational sessions hosted on the platform.\nStep 6: Access industry insights and trend reports to understand job market demands.\nStep 7: Create a personalized career development plan with short and long-term goals.'
      }
    ]
  },
  {
    id: 'employer-features',
    title: 'Employer Features',
    content: [
      { 
        question: 'How do I post a job?',
        answer: 'Step 1: Log in to your Employer Dashboard.\nStep 2: Click the "Post a New Job" button.\nStep 3: Fill out the job details form including title, description, requirements, and location.\nStep 4: Specify compensation (minimum $12/hour) and hours (maximum 40/week).\nStep 5: Set application requirements and screening questions.\nStep 6: Choose posting duration and visibility options.\nStep 7: Preview your job listing to ensure accuracy and completeness.\nStep 8: Submit your job posting for review and publication.'
      },
      { 
        question: 'How do I get verified as an employer?',
        answer: 'Step 1: During signup, select "Employer" as your account type.\nStep 2: Complete the basic registration with your contact information.\nStep 3: Access the employer verification form from your dashboard.\nStep 4: Provide your company details, EIN (Employer Identification Number), and business license information.\nStep 5: Upload supporting documentation as required.\nStep 6: Submit your verification request for review.\nStep 7: Wait for our team to verify your information (typically 1-2 business days).\nStep 8: Once approved, you\'ll receive full access to employer features.'
      },
      { 
        question: 'What information is required for job postings?',
        answer: 'All job postings must include the following essential information:\n• Job title: Clear and accurate position name\n• Job description: Detailed explanation of responsibilities\n• Required skills and qualifications: Specific abilities needed\n• Hours per week: Maximum 40 hours for high school students\n• Hourly wage: Minimum $12/hour compensation\n• Location: Physical workplace address or remote designation\n• Employment type: Part-time, seasonal, internship, etc.\n• Schedule flexibility: Required availability and flexibility\n• Application deadline: Last date to submit applications\n• Supervisor information: Who the student will report to'
      },
      { 
        question: 'How do I view applicants?',
        answer: 'Step 1: Log in to your Employer Dashboard.\nStep 2: Click on the "Applicants" tab to view all applications.\nStep 3: Filter applications by job listing, date, or status.\nStep 4: Sort candidates by qualification metrics or application date.\nStep 5: Click on an applicant's name to view their complete profile, resume, and application responses.\nStep 6: Use the review tools to rate applicants and add notes.\nStep 7: Change applicant status (Reviewing, Interview, Hired, Not Selected) as they progress.\nStep 8: Contact promising candidates directly through the messaging system.'
      },
      { 
        question: 'How to use the Kanban board for hiring?',
        answer: 'Step 1: Navigate to the "Candidates" tab in your Employer Dashboard.\nStep 2: The Kanban board displays all applicants organized by hiring stage.\nStep 3: Drag and drop candidate cards between stages (Applied, Screening, Interview, Hired) as they progress.\nStep 4: Click on a candidate card to view detailed information and add notes.\nStep 5: Use the "Edit Stages" button to customize your hiring pipeline (Premium feature).\nStep 6: Filter the board by job posting or candidate information.\nStep 7: Update candidate status and schedule interviews directly from their card.\nStep 8: Access analytics to view metrics about your hiring pipeline performance.'
      },
      { 
        question: 'What analytics are available?',
        answer: 'Premium employer accounts have access to comprehensive analytics including:\n• Application rates: Track number of applications per job posting\n• Demographic insights: Understand applicant demographics while maintaining privacy\n• Engagement metrics: View how candidates interact with your listings\n• Industry benchmarks: Compare your performance to similar employers\n• Source tracking: Identify which channels bring the most qualified applicants\n• Time-to-fill statistics: Track how quickly positions are filled\n• Conversion rates: Monitor applicant-to-interview and interview-to-hire ratios\n• Custom reporting: Generate tailored reports for specific metrics'
      },
      { 
        question: 'How do I communicate with applicants?',
        answer: 'Step 1: Access the secure messaging system from your Employer Dashboard.\nStep 2: Select the applicant you wish to contact from your applicants list.\nStep 3: Compose your message in the messaging interface.\nStep 4: Use templates for common communications like interview requests or status updates.\nStep 5: Schedule interviews by proposing available times through the calendar integration.\nStep 6: Attach any relevant documents or information.\nStep 7: Send the message, which will be delivered to the applicant\'s inbox and email.\nStep 8: Track all communications in the conversation history for each applicant.'
      }
    ]
  },
  {
    id: 'school-features',
    title: 'School Features',
    content: [
      { 
        question: 'How do schools integrate with the platform?',
        answer: 'Step 1: The designated school administrator creates an account and completes verification.\nStep 2: Navigate to the School Integration page from the administrator dashboard.\nStep 3: Choose your integration method (Manual, CSV upload, or API connection).\nStep 4: Follow the guided setup process for your selected method.\nStep 5: Map your school\'s data fields to the platform\'s system.\nStep 6: Set permissions and access levels for different staff members.\nStep 7: Review and confirm integration settings.\nStep 8: Test the integration with sample data before full implementation.'
      },
      { 
        question: 'How do teachers use the platform?',
        answer: 'Step 1: Create a teacher account and connect it to your school.\nStep 2: Access the Teacher Dashboard after logging in.\nStep 3: Set up your classes by adding students or importing class rosters.\nStep 4: Browse the curriculum resources for career education materials.\nStep 5: Create career development assignments for your students.\nStep 6: Track student progress through the analytics dashboard.\nStep 7: Provide feedback on student resumes and applications.\nStep 8: Generate reports on student engagement and career readiness progress.'
      },
      { 
        question: 'What tools do counselors have?',
        answer: 'School counselors have access to specialized tools including:\n• Student progress tracking: Monitor individual student activity and achievements\n• Career pathway recommendations: Suggest career paths based on student interests and skills\n• Bulk account management: Create and manage multiple student accounts efficiently\n• Group session planning: Tools for organizing career guidance workshops\n• College and career planning: Resources for post-secondary planning\n• One-on-one scheduling: Calendar for individual student appointments\n• Assessment tools: Career interest and aptitude evaluations\n• Parent communication portal: Share resources and progress with families'
      },
      { 
        question: 'How do schools monitor student activity?',
        answer: 'Step 1: Log in to the School Administrator or Counselor Dashboard.\nStep 2: Access the Analytics section to view aggregated student data.\nStep 3: Use filters to segment data by grade level, class, or activity type.\nStep 4: Review engagement metrics including login frequency and feature usage.\nStep 5: Track skill development progress across your student population.\nStep 6: Monitor job application submission rates and outcomes.\nStep 7: Generate custom reports for different stakeholders and purposes.\nStep 8: Set up scheduled reports to be delivered automatically via email.'
      },
      {
        question: 'How to organize career events with employers?',
        answer: 'Step 1: Navigate to the Events section in the School Administrator Dashboard.\nStep 2: Click "Create New Event" and select the event type (career fair, workshop, etc.).\nStep 3: Set the date, time, and location (physical or virtual).\nStep 4: Use the employer directory to invite relevant businesses to participate.\nStep 5: Customize registration options for students and track sign-ups.\nStep 6: Send automated reminders to all participants as the event approaches.\nStep 7: Access virtual meeting tools for online events directly through the platform.\nStep 8: Collect and review feedback post-event to improve future offerings.'
      }
    ]
  },
  {
    id: 'safety-compliance',
    title: 'Safety & Compliance',
    content: [
      { 
        question: 'How does the platform ensure student safety?',
        answer: 'Our platform implements comprehensive safety measures including:\n• Employer verification: Thorough vetting process for all business accounts\n• Age-appropriate job filtering: Jobs automatically filtered for legal compliance\n• Parental consent requirements: Built-in consent mechanisms for minor students\n• Message moderation: AI and human review of communications\n• Report functionality: Easy reporting of concerning content or behavior\n• Privacy controls: Students control what information is shared\n• Safe communication channels: No direct contact information exchange\n• Regular safety audits: Ongoing review of platform security and safety'
      },
      { 
        question: 'What privacy protections are in place?',
        answer: 'Student privacy is protected through:\n• FERPA and COPPA compliant data practices\n• Granular privacy settings for student profiles\n• Limited data sharing with employers until application\n• Anonymized analytics that protect individual identity\n• Secure data storage with encryption\n• Regular data minimization and retention reviews\n• Transparent privacy policies with simple explanations\n• Parental/guardian access and oversight options'
      },
      { 
        question: 'How are employers verified?',
        answer: 'Step 1: Employers submit basic business information during registration.\nStep 2: They provide their Employer Identification Number (EIN) and business license details.\nStep 3: Our automated system verifies this information against public records databases.\nStep 4: For businesses without clear public records, manual review is conducted by our team.\nStep 5: Background checks are performed for representatives who will interact directly with students.\nStep 6: Employers agree to our code of conduct and youth employment policies.\nStep 7: Verified employers receive a badge visible on their profile and job postings.\nStep 8: Ongoing monitoring ensures continued compliance with platform policies.'
      },
      { 
        question: 'What moderation policies are in effect?',
        answer: 'Our platform employs strict moderation policies including:\n• Pre-publishing review of all job listings\n• AI scanning of messages for inappropriate content\n• Human moderation team oversight of flagged content\n• Prohibited content guidelines that protect minor users\n• User reporting tools for immediate notification of concerns\n• Three-strike system for minor violations with permanent bans for serious infractions\n• Regular policy updates based on emerging best practices\n• Transparency reporting on moderation actions and outcomes'
      },
      {
        question: 'How do you ensure labor law compliance?',
        answer: 'Step 1: Our system automatically enforces youth employment law parameters including hour restrictions and prohibited job types.\nStep 2: Job listings are screened against a database of federal and state labor regulations for teens.\nStep 3: Wage minimums are enforced across all postings ($12/hour minimum).\nStep 4: Employers must acknowledge specific legal requirements before posting jobs.\nStep 5: Students receive education about their rights and protections under labor laws.\nStep 6: Our compliance team monitors changes in regulations across jurisdictions.\nStep 7: Regular compliance audits are conducted on active job postings.\nStep 8: We provide resources and guides to both employers and students about labor law requirements.'
      }
    ]
  },
  {
    id: 'technical-support',
    title: 'Technical Support',
    content: [
      { 
        question: 'How do I get help with technical issues?',
        answer: 'Step 1: Click on the Help icon (question mark) in the navigation bar.\nStep 2: Browse the troubleshooting guides for common issues.\nStep 3: Use the search function to find specific help topics.\nStep 4: If your issue isn\'t resolved, click "Submit a Support Ticket".\nStep 5: Fill out the support form with details about your problem, including any error messages.\nStep 6: Attach screenshots if they help explain the issue.\nStep 7: Submit your ticket and note the reference number provided.\nStep 8: Check your email for updates from our support team, who typically respond within 24 hours.'
      },
      { 
        question: 'Can I use the platform on mobile devices?',
        answer: 'Yes, our platform is fully mobile-responsive with the following features:\n• Responsive design that adapts to any screen size\n• Full functionality on smartphones and tablets\n• No app download required—works through your mobile browser\n• Optimized interface for touch screen navigation\n• Mobile-friendly job application process\n• Push notification options for timely updates\n• Data-saving mode for limited connections\n• Offline content access for certain resources'
      },
      { 
        question: 'What browsers are supported?',
        answer: 'The platform supports all modern browsers including:\n• Google Chrome (latest two versions)\n• Mozilla Firefox (latest two versions)\n• Apple Safari (latest two versions)\n• Microsoft Edge (Chromium-based versions)\n• Opera (latest version)\n\nFor the best experience, we recommend keeping your browser updated to the latest version. Some advanced features may have limited functionality on older browsers.'
      },
      { 
        question: 'How are system updates handled?',
        answer: 'Step 1: System updates are scheduled during low-usage periods, typically weekends or late evenings.\nStep 2: Users are notified of upcoming updates via email and in-platform announcements 3-5 days in advance.\nStep 3: Critical security updates may be applied immediately without advance notice to protect user data.\nStep 4: During updates, the platform may be temporarily unavailable or in read-only mode.\nStep 5: Progress is saved automatically, so no work is lost during updates.\nStep 6: After updates, users receive a notification summarizing new features or improvements.\nStep 7: Tutorial overlays guide users through significant interface changes.\nStep 8: The support team has increased availability following major updates to assist with any questions.'
      },
      {
        question: 'How do I report bugs or suggest features?',
        answer: 'Step 1: Click on your profile icon and select "Feedback" from the dropdown menu.\nStep 2: Choose between "Report a Bug" or "Suggest a Feature".\nStep 3: For bugs, describe the issue in detail including what you were doing when it occurred.\nStep 4: Attach screenshots or recordings that demonstrate the bug if possible.\nStep 5: For feature suggestions, describe your idea and explain how it would improve the platform.\nStep 6: Rate the priority of your suggestion from your perspective.\nStep 7: Submit your report, which will be reviewed by our product team.\nStep 8: You\'ll receive a notification when your report is reviewed, and may be contacted for additional information.'
      }
    ]
  },
  {
    id: 'premium-features',
    title: 'Premium Features',
    content: [
      { 
        question: 'What premium features are available for employers?',
        answer: 'Premium employer features include:\n• Enhanced job visibility with priority placement\n• Detailed analytics and recruiting insights\n• AI-powered candidate matching algorithms\n• Bulk job posting capabilities\n• Branded company profiles with rich media\n• Custom application forms and screening questions\n• Advanced candidate filtering and sorting\n• Unlimited saved candidate searches\n• Priority support with dedicated account manager\n• Interview scheduling automation\n• Custom hiring pipeline stages\n• Employer branding toolkit'
      },
      { 
        question: 'What premium features are available for schools?',
        answer: 'Schools can access premium features including:\n• Custom branding with school colors and logo\n• API integrations with school information systems\n• Advanced analytics on student engagement\n• Bulk student account management\n• Custom curriculum and assignment tools\n• Automated progress reporting\n• Parent portal access for guardian oversight\n• Career event management platform\n• Custom badge and achievement creation\n• Expanded storage for school resources\n• Priority technical support\n• Staff training and onboarding assistance'
      },
      { 
        question: 'How do I upgrade to a premium account?',
        answer: 'Step 1: Log in to your account and navigate to the Premium Services page.\nStep 2: Review the available premium plans and their features.\nStep 3: Select the plan that best meets your needs (monthly or annual options).\nStep 4: Choose your payment method (credit card, PayPal, or invoice for schools).\nStep 5: Complete the payment process through our secure payment gateway.\nStep 6: Receive confirmation of your upgrade via email.\nStep 7: Your account will be instantly upgraded with premium features.\nStep 8: Schedule an optional onboarding call to learn how to maximize new features.'
      },
      {
        question: 'How do I manage my premium subscription?',
        answer: 'Step 1: Log in to your account and go to your Account Settings.\nStep 2: Select the "Subscription" tab to view your current plan details.\nStep 3: Here you can see your billing cycle, next payment date, and payment method.\nStep 4: To update your payment information, click the "Update Payment Method" button.\nStep 5: To upgrade or downgrade your plan, select "Change Plan" and follow the prompts.\nStep 6: To cancel your subscription, click "Cancel Subscription" and follow the confirmation steps.\nStep 7: Download past invoices by selecting "Billing History".\nStep 8: Contact premium support for any billing questions or special arrangements.'
      },
      {
        question: 'What support is available for premium users?',
        answer: 'Premium users receive enhanced support options including:\n• Priority ticket handling for technical issues\n• Dedicated account manager for ongoing assistance\n• Phone support during extended business hours\n• Scheduled video consultations for optimization help\n• Access to premium support knowledge base\n• Monthly check-in calls for enterprise accounts\n• Early access to new features with personalized training\n• Custom onboarding for team members\n• Regular strategy sessions for employers with high volume\n• Performance optimization recommendations'
      }
    ]
  },
  {
    id: 'for-parents',
    title: 'For Parents & Guardians',
    content: [
      {
        question: 'How does parental oversight work?',
        answer: 'Step 1: Your student will send you an invitation to connect as a parent/guardian.\nStep 2: Click the link in the email invitation to create your parent account.\nStep 3: Complete the verification process to confirm your relationship to the student.\nStep 4: Once verified, you\'ll have access to a specialized parent dashboard.\nStep 5: View your student\'s activity including applications submitted and interviews scheduled.\nStep 6: Receive notifications about important events in your student\'s job search.\nStep 7: Provide digital consent for applications when required (for students under 16).\nStep 8: Access parent-specific resources about supporting your student\'s career journey.'
      },
      {
        question: 'What information can parents access?',
        answer: 'Parents and guardians can access:\n• Applications submitted by their student\n• Interview schedules and preparation materials\n• Job offers and details\n• Skill development progress\n• Educational resources completed\n• Safety and privacy settings\n• Communication history with employers (without content)\n• Resume and portfolio contents\n\nParents cannot access private messages or alter applications unless their student is under 16 years old.'
      },
      {
        question: 'How are work permits handled?',
        answer: 'Step 1: Check if your state requires work permits for minors through our compliance guide.\nStep 2: If required, access the digital work permit section in your parent dashboard.\nStep 3: Complete the required information including employer details and hours.\nStep 4: Your student will complete their portion of the information.\nStep 5: The system generates the appropriate work permit form for your state.\nStep 6: Electronically sign the form through our secure signature system.\nStep 7: The completed form is sent to the employer and school for additional signatures if required.\nStep 8: Once fully executed, the work permit is stored in your student\'s document repository and shared with all relevant parties.'
      }
    ]
  }
];
