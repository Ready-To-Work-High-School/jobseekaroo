
/**
 * Common troubleshooting issues and solutions
 */

export interface TroubleshootingIssue {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  solutions: string[];
  additionalResources?: string[];
}

export const commonIssues: TroubleshootingIssue[] = [
  {
    id: "network-connectivity",
    title: "Network Connectivity Issues",
    description: "Problems with your internet connection affecting application performance.",
    symptoms: [
      "Slow loading times",
      "Timeout errors",
      "Cannot connect to services",
      "Error messages about network or connectivity"
    ],
    solutions: [
      "Check your internet connection",
      "Try disabling VPN or proxy services",
      "Clear browser cache and cookies",
      "Try using a different browser or device"
    ],
    additionalResources: [
      "Network Troubleshooting Guide"
    ]
  },
  {
    id: "authentication-issues",
    title: "Authentication Problems",
    description: "Difficulties with signing in or maintaining your session.",
    symptoms: [
      "Cannot log in despite correct credentials",
      "Frequent session timeouts",
      "Being asked to log in repeatedly",
      "'Unauthorized' error messages"
    ],
    solutions: [
      "Clear browser cookies and try again",
      "Check if you're using the correct email/username",
      "Reset your password",
      "Ensure third-party cookies are enabled"
    ]
  },
  {
    id: "display-rendering",
    title: "Display or Rendering Issues",
    description: "Visual problems with how the application appears in your browser.",
    symptoms: [
      "Missing images or icons",
      "Text formatting issues",
      "Layout appears broken or misaligned",
      "Content overflows or is cut off"
    ],
    solutions: [
      "Try zooming out (Ctrl/Cmd -) if content appears too large",
      "Update your browser to the latest version",
      "Disable browser extensions that might interfere",
      "Try a different browser"
    ]
  },
  {
    id: "performance-issues",
    title: "Performance Problems",
    description: "The application is running slowly or becoming unresponsive.",
    symptoms: [
      "Slow response times when clicking buttons",
      "Pages take a long time to load",
      "Animations are jerky or sluggish",
      "Application freezes temporarily"
    ],
    solutions: [
      "Close other browser tabs and applications",
      "Clear your browser cache",
      "Disable unnecessary browser extensions",
      "Check your device's available memory and CPU usage"
    ]
  },
  {
    id: "data-loading",
    title: "Data Loading Failures",
    description: "Problems with loading or displaying your data.",
    symptoms: [
      "Empty sections where data should appear",
      "Error messages about failed data retrieval",
      "Partial or incomplete data displayed",
      "'No results found' when you expect results"
    ],
    solutions: [
      "Refresh the page to retry data loading",
      "Check your internet connection",
      "Clear browser cache",
      "Contact support if specific data is consistently missing"
    ]
  },
  {
    id: "feature-access",
    title: "Feature Access Problems",
    description: "Unable to access certain features or functionality.",
    symptoms: [
      "Buttons or links that don't respond when clicked",
      "Features mentioned in documentation but not visible",
      "Access denied messages",
      "Features that appear disabled"
    ],
    solutions: [
      "Check if your account has the necessary permissions",
      "Ensure your subscription is active (if applicable)",
      "Try logging out and back in",
      "Contact support to verify account privileges"
    ]
  }
];

