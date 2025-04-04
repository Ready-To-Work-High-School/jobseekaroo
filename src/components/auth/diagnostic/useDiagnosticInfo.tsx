
import { useState, useEffect } from "react";

export const useDiagnosticInfo = () => {
  const [diagnosticInfo, setDiagnosticInfo] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Collect diagnostic information
    const testThirdPartyCookies = async () => {
      try {
        // Simple approach to check if third-party cookies might be working
        const testFrame = document.createElement('iframe');
        testFrame.style.display = 'none';
        testFrame.src = 'https://accounts.google.com/gsi/iframe/select';
        
        const timeout = setTimeout(() => {
          if (document.body.contains(testFrame)) {
            document.body.removeChild(testFrame);
            
            setDiagnosticInfo(current => ({
              ...current,
              thirdPartyCookiesTest: "Likely blocked (timeout)"
            }));
          }
        }, 2000);
        
        testFrame.onload = () => {
          clearTimeout(timeout);
          if (document.body.contains(testFrame)) {
            document.body.removeChild(testFrame);
          }
          setDiagnosticInfo(current => ({
            ...current,
            thirdPartyCookiesTest: "Likely allowed"
          }));
        };
        
        testFrame.onerror = () => {
          clearTimeout(timeout);
          if (document.body.contains(testFrame)) {
            document.body.removeChild(testFrame);
          }
          setDiagnosticInfo(current => ({
            ...current,
            thirdPartyCookiesTest: "Error (likely blocked)"
          }));
        };
        
        document.body.appendChild(testFrame);
      } catch (e) {
        setDiagnosticInfo(current => ({
          ...current,
          thirdPartyCookiesTest: `Error: ${e.message}`
        }));
      }
    };
    
    // Collect basic info
    const info = {
      userAgent: navigator.userAgent,
      protocol: window.location.protocol,
      host: window.location.host,
      online: navigator.onLine,
      cookiesEnabled: navigator.cookieEnabled,
      deviceMemory: (navigator as any).deviceMemory || 'unknown',
      browserSupported: !(/MSIE|Trident/.test(navigator.userAgent)),
      localStorage: (() => {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return "Available";
        } catch (e) {
          return "Unavailable";
        }
      })(),
      sessionStorage: (() => {
        try {
          sessionStorage.setItem('test', 'test');
          sessionStorage.removeItem('test');
          return "Available";
        } catch (e) {
          return "Unavailable";
        }
      })(),
      googleAuthConfigured: true,
      timestamp: new Date().toISOString(),
      googleHostReachable: "Checking...",
      thirdPartyCookiesTest: "Checking..."
    };
    
    setDiagnosticInfo(info);
    
    // Check if Google is reachable
    fetch('https://accounts.google.com/gsi/status', { 
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    })
    .then(() => {
      setDiagnosticInfo(current => ({
        ...current,
        googleHostReachable: "Yes"
      }));
    })
    .catch(err => {
      setDiagnosticInfo(current => ({
        ...current,
        googleHostReachable: `No (${err.message})`
      }));
    });
    
    // Test third-party cookies
    testThirdPartyCookies();
    
  }, []);

  return diagnosticInfo;
};

export default useDiagnosticInfo;
