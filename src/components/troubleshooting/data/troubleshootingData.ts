
import { 
  Wifi, 
  WifiOff, 
  UserX, 
  Database, 
  FileWarning, 
  Bug, 
  Cpu,
  AlertCircle,
  Lock,
  Mail,
  User
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface CommonIssue {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  solutions: string[];
  solution?: string; // For backward compatibility
}

export const commonIssues: CommonIssue[] = [
  {
    id: "network",
    title: "Network Connectivity Issues",
    description: "Unable to connect to the internet or access server resources.",
    icon: WifiOff,
    solutions: [
      "Check your internet connection",
      "Try refreshing the page",
      "Clear your browser cache and cookies",
      "Try accessing the site from a different network"
    ]
  },
  {
    id: "authentication",
    title: "Authentication Problems",
    description: "Issues with logging in or accessing your account.",
    icon: UserX,
    solutions: [
      "Verify your username and password",
      "Reset your password if you can't remember it",
      "Clear your browser cookies and try again",
      "Contact support if you're still having issues"
    ]
  },
  {
    id: "data",
    title: "Data Loading Errors",
    description: "Information or content isn't loading correctly.",
    icon: Database,
    solutions: [
      "Refresh the page",
      "Check your internet connection",
      "Clear your browser cache",
      "Try logging out and back in"
    ]
  },
  {
    id: "display",
    title: "Display and Layout Problems",
    description: "Interface elements are missing or displayed incorrectly.",
    icon: FileWarning,
    solutions: [
      "Try a different browser",
      "Update your browser to the latest version",
      "Disable browser extensions that might interfere",
      "Try adjusting your zoom level"
    ]
  },
  {
    id: "performance",
    title: "Performance Issues",
    description: "The application is running slowly or freezing.",
    icon: Cpu,
    solutions: [
      "Close other browser tabs and applications",
      "Clear your browser cache",
      "Try a different browser",
      "Check your device's available storage"
    ]
  },
  {
    id: "bugs",
    title: "Feature Bugs",
    description: "Specific features not working as expected.",
    icon: Bug,
    solutions: [
      "Try refreshing the page",
      "Clear your browser cache",
      "Check for any browser console errors",
      "Report the issue to support with specific details"
    ]
  },
  {
    id: "compatibility",
    title: "Browser Compatibility Issues",
    description: "Problems with specific browsers or devices.",
    icon: AlertCircle,
    solutions: [
      "Try a different browser (Chrome, Firefox, Safari)",
      "Update your browser to the latest version",
      "Disable browser extensions",
      "Try accessing from a different device"
    ]
  },
  {
    id: "connectivity",
    title: "Connection Stability Issues",
    description: "Intermittent connection problems affecting functionality.",
    icon: Wifi,
    solutions: [
      "Check for a stable internet connection",
      "Try connecting to a different network",
      "Restart your router or modem",
      "Contact your internet service provider if issues persist"
    ]
  },
  {
    id: "login",
    title: "Login Issues",
    description: "Having trouble signing in to your account?",
    icon: Lock,
    solutions: [
      "Verify your email address and password are correct",
      "Try resetting your password through the 'Forgot Password' link",
      "Clear your browser cache and cookies",
      "Try using an incognito/private browser window"
    ]
  },
  {
    id: "jobs",
    title: "Jobs Not Loading",
    description: "Issues with viewing or applying to jobs?",
    icon: Bug,
    solutions: [
      "Refresh the page to reload job listings",
      "Check your internet connection",
      "Clear your browser cache and cookies",
      "Try using a different browser or device"
    ]
  },
  {
    id: "application",
    title: "Application Submission Errors",
    description: "Problems submitting your job application?",
    icon: Mail,
    solutions: [
      "Ensure all required fields are completed correctly",
      "Check for any error messages on the form",
      "Try submitting your application from a different device",
      "Contact support if the problem continues"
    ]
  },
  {
    id: "profile",
    title: "Profile Updates Not Saving",
    description: "Changes to your profile not being saved?",
    icon: User,
    solutions: [
      "Make sure to click the Save button after making changes",
      "Try uploading smaller image files (under 2MB) for profile pictures",
      "Check your internet connection",
      "Clear your browser cache and try again"
    ]
  }
];
