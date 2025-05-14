
export interface TroubleshootingIssue {
  id: string;
  title: string;
  description: string;
  solution: string[];
}

export const commonIssues: TroubleshootingIssue[] = [
  {
    id: "network-connection",
    title: "Network Connection Issue",
    description: "You're experiencing problems connecting to our servers. This could be due to your internet connection or our server status.",
    solution: [
      "Check your internet connection by visiting another website.",
      "Try refreshing the page.",
      "If using a VPN or proxy, try disabling it temporarily.",
      "Clear your browser cache and cookies.",
      "If the problem persists, our servers may be experiencing issues. Please try again later."
    ]
  },
  {
    id: "login-issues",
    title: "Login or Authentication Problems",
    description: "You're having trouble logging in or staying logged in to your account.",
    solution: [
      "Check that you're entering the correct email and password.",
      "Reset your password using the 'Forgot Password' link.",
      "Clear your browser cookies and cache.",
      "Try using a different browser or device.",
      "If you recently changed your password, make sure you're using the new one."
    ]
  },
  {
    id: "application-submission",
    title: "Application Submission Failures",
    description: "You're encountering errors when trying to submit a job application.",
    solution: [
      "Check that all required fields are completed correctly.",
      "Ensure any files you're uploading meet the size and format requirements.",
      "Try using a different browser.",
      "If you're uploading a resume, try converting it to a different format (PDF, DOCX).",
      "Clear your browser cache and cookies, then try again."
    ]
  },
  {
    id: "data-loading",
    title: "Content Not Loading",
    description: "Job listings, images, or other content isn't loading properly on the site.",
    solution: [
      "Refresh the page.",
      "Clear your browser cache.",
      "Try using a different browser or device.",
      "Check if you're using any browser extensions that might block content, and disable them.",
      "If you're on a mobile device, try switching between WiFi and cellular data."
    ]
  },
  {
    id: "profile-updates",
    title: "Profile Updates Not Saving",
    description: "Changes to your profile aren't being saved or displayed correctly.",
    solution: [
      "Make sure you're clicking the 'Save' or 'Update' button after making changes.",
      "Check that all required fields are completed correctly.",
      "Try using a different browser.",
      "Clear your browser cache and cookies.",
      "Log out and log back in, then try updating your profile again."
    ]
  }
];
