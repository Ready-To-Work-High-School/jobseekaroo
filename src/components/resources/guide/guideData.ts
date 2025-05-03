
import { GuideSection } from './types';

export const guideSections: GuideSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button on the top right corner of the homepage. Fill in your details including name, email, and create a password. Verify your email address by clicking on the link sent to your inbox, and you're all set! Visit our <a href='/sign-up' class='text-blue-600 hover:underline'>Sign Up page</a> to get started."
      },
      {
        question: "What information do I need to complete my profile?",
        answer: "For a complete profile, include your basic information (name, contact details), educational background, skills, work experience, and career preferences. Uploading a professional photo and adding your credentials will make your profile more attractive to employers. Visit your <a href='/profile' class='text-blue-600 hover:underline'>Profile page</a> to add or update your information."
      },
      {
        question: "How do I reset my password?",
        answer: "Click on the 'Sign In' page and then select 'Forgot Password'. Enter your registered email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password. Access the <a href='/reset-password' class='text-blue-600 hover:underline'>Password Reset page</a> directly if needed."
      },
      {
        question: "How do I navigate the platform?",
        answer: "Our platform has a user-friendly navigation system. The main menu at the top of the page provides access to key sections including Jobs, Resources, Dashboard, and Profile. On mobile devices, tap the menu icon to reveal navigation options. Your personalized dashboard at <a href='/student-dashboard' class='text-blue-600 hover:underline'>Dashboard</a> shows recommended jobs, application status, and upcoming interviews."
      },
      {
        question: "How do I set up notifications?",
        answer: "To customize your notification preferences, go to your <a href='/profile#settings' class='text-blue-600 hover:underline'>Profile Settings</a> and select the 'Notifications' tab. You can choose to receive alerts for new job matches, application status updates, messages from employers, and platform announcements via email, mobile push notifications, or directly on the platform."
      },
      {
        question: "What should I do after creating my account?",
        answer: "After creating your account, we recommend these steps for the best experience:<ul class='list-disc pl-5 space-y-1 mt-2'><li>Complete your <a href='/profile' class='text-blue-600 hover:underline'>profile</a> with education, skills, and work preferences</li><li>Upload or create a <a href='/resume-assistant' class='text-blue-600 hover:underline'>resume</a> using our Resume Assistant tool</li><li>Take the <a href='/career-quiz' class='text-blue-600 hover:underline'>Career Quiz</a> to discover suitable career paths</li><li>Browse <a href='/job-search' class='text-blue-600 hover:underline'>job listings</a> tailored to high school students</li><li>Explore <a href='/credentials' class='text-blue-600 hover:underline'>credentials</a> you can earn to enhance your profile</li></ul>"
      }
    ]
  },
  {
    id: "job-search",
    title: "Job Search",
    content: [
      {
        question: "How do I search for jobs?",
        answer: "Use the search bar on the homepage or Jobs page to find opportunities by keyword, location, or job type. You can refine your search using filters like distance, industry, pay rate, and required credentials."
      },
      {
        question: "Can I save jobs for later?",
        answer: "Yes! When browsing jobs, click the 'Save' or heart icon to add a job to your saved list. You can access all saved jobs from your dashboard under 'Saved Jobs'."
      },
      {
        question: "How do I set up job alerts?",
        answer: "After performing a search, click 'Create Alert' to receive notifications for similar jobs. You can customize how often you receive these alerts and manage all your alerts from your account settings."
      }
    ]
  },
  {
    id: "applications",
    title: "Applications",
    content: [
      {
        question: "How do I apply for a job?",
        answer: "When viewing a job posting, click the 'Apply Now' button. Fill in the required information, attach your resume if requested, and submit your application. You'll receive a confirmation email once your application is successfully submitted."
      },
      {
        question: "Can I track my applications?",
        answer: "Yes, you can track all your applications from your dashboard under 'My Applications'. This section shows the status of each application (submitted, viewed, in progress, accepted, or declined)."
      },
      {
        question: "How do I withdraw an application?",
        answer: "To withdraw an application, go to 'My Applications' in your dashboard, find the job you want to withdraw from, and click 'Withdraw Application'. Note that some employers may still see that you initially applied."
      }
    ]
  },
  {
    id: "credentials",
    title: "Credentials & Skills",
    content: [
      {
        question: "How do I add credentials to my profile?",
        answer: "Go to your profile page and select the 'Credentials' tab. Click 'Add Credential' and enter the details of your certification or credential. You can add the credential name, issuing organization, date acquired, and upload verification documents if needed."
      },
      {
        question: "What types of credentials are valued by employers?",
        answer: "Employers typically value industry-recognized certifications, technical skills credentials, safety certificates, and academic achievements. For high school students, course completions, digital badges from recognized programs, and skills assessments are particularly valuable."
      },
      {
        question: "How do I showcase my skills effectively?",
        answer: "In your profile, add relevant skills in the Skills section. Be specific about technical skills, soft skills, and tools you're proficient in. Adding projects or examples that demonstrate these skills will further strengthen your profile."
      }
    ]
  },
  {
    id: "programs",
    title: "Internships & Programs",
    content: [
      {
        question: "What is the difference between internships, apprenticeships, and externships?",
        answer: "Internships are typically short-term (1-3 months) work experiences that provide hands-on learning in a professional environment. Apprenticeships are longer-term (1-3 years), combining on-the-job training with classroom instruction, often in skilled trades. Externships are short job shadowing experiences (1-2 weeks) for observation and learning without hands-on work responsibilities."
      },
      {
        question: "Tell me about the Mayo Clinic Summer Program",
        answer: "The Mayo Clinic Summer Program offers high school students the opportunity to gain experience in healthcare settings. The program includes clinical rotations, research opportunities, and mentorship from healthcare professionals. Applications typically open in January, requiring recommendation letters, academic transcripts, and a personal statement. Visit the Mayo Clinic website for specific program details and eligibility requirements."
      },
      {
        question: "What is the Macquarie Leads Externship?",
        answer: "The Macquarie Leads Externship is a competitive program offering students a 1-2 week observational experience at Macquarie Group. Participants shadow professionals in finance, investment banking, and related fields. The program provides valuable industry insights, networking opportunities, and potential pathways to future internships. For more information and application details, visit https://www.extern.com/externships/macquarie-leads."
      },
      {
        question: "How can I find internships suited to my skills?",
        answer: "Use the 'Programs' filter in our job search to find internships. Match your skills and interests to program descriptions, and check the 'For You' section on your dashboard for personalized recommendations. You can also attend virtual career fairs and networking events accessible through the Events tab."
      },
      {
        question: "What should I include in an application for these programs?",
        answer: "Create a targeted resume highlighting relevant coursework, skills, and extracurricular activities. Write a compelling cover letter explaining why you're interested in the specific program and organization. Prepare for interviews by researching the organization and practicing common questions. Request recommendation letters from teachers or mentors who can speak to your abilities and potential."
      }
    ]
  },
  {
    id: "employers",
    title: "For Employers",
    content: [
      {
        question: "How do I post a job?",
        answer: "Sign in to your employer account, navigate to your dashboard and click 'Post a Job'. Fill in all the required details about the position, including job title, description, requirements, and compensation. Review your posting and click 'Submit' to publish it."
      },
      {
        question: "How does the verification process work for employers?",
        answer: "After creating an employer account, you'll need to complete the verification process. Provide your business information, including your business license or tax ID. Our team will review your information within 1-3 business days and notify you once your account is verified."
      },
      {
        question: "Can I see analytics for my job postings?",
        answer: "Yes, from your employer dashboard, you can access detailed analytics for each job posting. View metrics such as the number of views, applications received, candidate demographics, and engagement rates. These insights help you optimize your recruitment strategy."
      }
    ]
  },
  {
    id: "schools",
    title: "For Schools",
    content: [
      {
        question: "How can our school partner with the platform?",
        answer: "Schools can partner with us by contacting our Schools Partnership team through the 'For Schools' page. We offer various partnership levels, including platform integration, career counselor access, student group registrations, and curriculum resources."
      },
      {
        question: "What resources are available for career counselors?",
        answer: "Career counselors have access to a special dashboard with student progress tracking, credential verification tools, employer connection portals, and specialized reports. We also provide curriculum resources and workshop materials for career readiness programs."
      },
      {
        question: "How do students register through their school?",
        answer: "If your school is a partner, students can register using their school email address. When they sign up, they'll select their school from the dropdown menu, which will automatically connect them to their school's network on the platform."
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    content: [
      {
        question: "I can't log in to my account",
        answer: "First, ensure you're using the correct email address and password. If you've forgotten your password, use the 'Forgot Password' option. Check that you've verified your email address. If problems persist, clear your browser cookies or try using a different browser. For continued issues, contact our support team."
      },
      {
        question: "My application wasn't submitted successfully",
        answer: "If your application wasn't submitted, check your internet connection and try again. Ensure all required fields are completed and any documents are in the correct format (usually PDF, DOC, or DOCX) and under the file size limit. If the issue continues, take a screenshot of any error messages and contact our support team."
      },
      {
        question: "How do I report a technical issue?",
        answer: "To report a technical issue, go to 'Help & Support' in the footer menu and select 'Report an Issue'. Describe the problem in detail, including what you were doing when it occurred, and attach screenshots if possible. Our technical team will investigate and respond within 24-48 hours."
      }
    ]
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    content: [
      {
        question: "How should I prepare for my first job interview?",
        answer: `<p>Preparing for your first job interview involves several important steps:</p>
        <ol class="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>Research the company:</strong> Learn about the company's products, services, values, and culture by reviewing their website and social media.</li>
          <li><strong>Understand the job requirements:</strong> Carefully review the job description and think about how your skills and experiences match what they're looking for.</li>
          <li><strong>Practice common questions:</strong> Prepare answers for frequently asked questions like "Tell me about yourself" and "Why do you want to work here?" Visit our <a href="/interview-questions" class="text-blue-600 hover:underline">Common Interview Questions</a> page for more guidance.</li>
          <li><strong>Prepare your own questions:</strong> Have 2-3 thoughtful questions ready to ask the interviewer about the role or company.</li>
          <li><strong>Plan your outfit:</strong> Choose clean, professional attire appropriate for the workplace environment.</li>
          <li><strong>Practice with our simulator:</strong> Use our <a href="/mock-interview" class="text-blue-600 hover:underline">Mock Interview Simulator</a> to practice answering questions out loud.</li>
          <li><strong>Complete the checklist:</strong> Follow our <a href="/interview-checklist" class="text-blue-600 hover:underline">Interview Checklist</a> to ensure you're fully prepared.</li>
        </ol>
        <p>Remember that it's normal to be nervous - preparation is the best way to build your confidence!</p>`
      },
      {
        question: "What should I wear to my interview?",
        answer: `<p>Your interview attire should be professional and appropriate for the specific workplace:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Research the company culture:</strong> Look at employee photos on their website or social media to understand the dress code.</li>
          <li><strong>Dress one level up:</strong> It's better to be slightly overdressed than underdressed. For most entry-level positions, business casual is appropriate.</li>
          <li><strong>Business casual options:</strong> Neat slacks or skirt with a button-down shirt, blouse, or sweater.</li>
          <li><strong>More formal positions:</strong> Consider a suit or blazer with dress pants or skirt.</li>
          <li><strong>Retail/Food service:</strong> Clean, pressed slacks and a button-down shirt or blouse.</li>
          <li><strong>Grooming:</strong> Ensure your clothes are clean and wrinkle-free, hair is neat, and personal hygiene is good.</li>
          <li><strong>Accessories:</strong> Keep jewelry minimal and professional.</li>
        </ul>
        <p>When in doubt, it's always better to dress more professionally than less. First impressions matter!</p>`
      },
      {
        question: "How early should I arrive for my interview?",
        answer: `<p>Timing is an important aspect of interview professionalism:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Arrive 10-15 minutes early:</strong> This shows punctuality and gives you time to compose yourself.</li>
          <li><strong>Plan your route:</strong> If you're unfamiliar with the location, do a practice run beforehand or use maps to estimate travel time.</li>
          <li><strong>Buffer time:</strong> Allow extra time for unexpected delays like traffic or public transportation issues.</li>
          <li><strong>Too early?</strong> If you arrive more than 15 minutes early, wait in your car or a nearby café until about 10-15 minutes before your scheduled time.</li>
          <li><strong>Virtual interviews:</strong> Log in 5-10 minutes early to test your technology and ensure your camera and microphone are working properly.</li>
        </ul>
        <p>Being punctual demonstrates reliability, which is a quality all employers value!</p>`
      },
      {
        question: "What is the STAR method for answering interview questions?",
        answer: `<p>The STAR method is a structured approach to answering behavioral interview questions effectively:</p>
        <ul class="list-disc pl-6 space-y-4 mb-4">
          <li>
            <strong>S - Situation:</strong> 
            <p>Describe the context or background for your example. Set the scene by explaining where you were working, your role, and the specific challenge or situation you faced.</p>
            <p><em>Example: "During my junior year, I was working on a group science project with a tight one-week deadline."</em></p>
          </li>
          <li>
            <strong>T - Task:</strong> 
            <p>Explain what you were responsible for in that situation. What were your specific duties or goals?</p>
            <p><em>Example: "My task was to coordinate the research efforts of our four-person team and compile everyone's findings into a cohesive report."</em></p>
          </li>
          <li>
            <strong>A - Action:</strong> 
            <p>Describe the specific actions you took to address the situation. Focus on what <em>you</em> did, not what the team did (use "I" not "we").</p>
            <p><em>Example: "I created a shared document where everyone could add their research in real-time. I scheduled daily check-ins to track progress and help team members who were falling behind. When one member got sick, I redistributed some of their work to ensure we stayed on schedule."</em></p>
          </li>
          <li>
            <strong>R - Result:</strong> 
            <p>Share the positive outcome of your actions. Quantify results if possible and include what you learned from the experience.</p>
            <p><em>Example: "We completed the project on time and received an A grade. Our teacher used our approach as an example for other teams. I learned valuable skills about project management and how to adapt quickly when unexpected problems arise."</em></p>
          </li>
        </ul>
        <p>Practice using this method for questions that begin with phrases like "Tell me about a time when..." or "Give me an example of..." Visit our <a href="/interview-questions" class="text-blue-600 hover:underline">Interview Questions</a> page to practice with specific examples.</p>`
      },
      {
        question: "What questions should I ask the interviewer?",
        answer: `<p>Asking thoughtful questions demonstrates your interest in the position and helps you determine if the job is right for you. Here are some effective questions to consider:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>About the role:</strong> "Could you describe what a typical day would look like in this position?" or "What would success look like in this role after 3 months?"</li>
          <li><strong>About training:</strong> "What kind of training is provided for new employees?" or "How will I learn the specific skills needed for this position?"</li>
          <li><strong>About the team:</strong> "Who would I be working with directly?" or "How is the team structured?"</li>
          <li><strong>About growth:</strong> "Are there opportunities for advancement or learning new skills in this role?"</li>
          <li><strong>About the company culture:</strong> "What do employees enjoy most about working here?" or "How would you describe the work environment?"</li>
          <li><strong>Next steps:</strong> "What are the next steps in the interview process?" or "When might I expect to hear back about this position?"</li>
        </ul>
        <p>Avoid questions about salary, benefits, or time off in the first interview unless the interviewer brings up these topics. Also, don't ask questions that could easily be answered by reading the company website or job description.</p>`
      }
    ]
  }
];
