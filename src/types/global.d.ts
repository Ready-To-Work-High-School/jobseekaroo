
interface Window {
  gtag?: (...args: any[]) => void;
}

// This adds the gtag to the Window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
