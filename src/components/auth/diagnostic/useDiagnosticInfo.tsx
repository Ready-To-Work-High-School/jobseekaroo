
import { useState, useEffect } from "react";

export const useDiagnosticInfo = () => {
  const [diagnosticInfo, setDiagnosticInfo] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Collect diagnostic information
    const info = {
      userAgent: navigator.userAgent,
      protocol: window.location.protocol,
      host: window.location.host,
      online: navigator.onLine,
      cookiesEnabled: navigator.cookieEnabled,
      thirdPartyCookiesTest: "Unknown (needs testing)",
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
    };
    
    setDiagnosticInfo(info);
  }, []);

  return diagnosticInfo;
};
