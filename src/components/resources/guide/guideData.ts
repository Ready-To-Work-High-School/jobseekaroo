
import { GuideSection } from './types';

export const guideSections: GuideSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button on the top right corner of the homepage. Fill in your details including name, email, and create a password. Verify your email address by clicking on the link sent to your inbox, and you're all set!"
      },
      {
        question: "What information do I need to complete my profile?",
        answer: "For a complete profile, include your basic information (name, contact details), educational background, skills, work experience, and career preferences. Uploading a professional photo and adding your credentials will make your profile more attractive to employers."
      },
      {
        question: "How do I reset my password?",
        answer: "Click on the 'Sign In' page and then select 'Forgot Password'. Enter your registered email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password."
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
  }
];
