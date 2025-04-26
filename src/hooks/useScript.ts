
import { useEffect, useState } from 'react';

type ScriptStatus = 'loading' | 'ready' | 'error';

export const useScript = (src: string): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>(src ? 'loading' : 'error');

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }

    const handleLoad = () => setStatus('ready');
    const handleError = () => setStatus('error');

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src]);

  return status;
};
