
interface Window {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: Element | null;
    }) => void;
  };
  gtag?: (command: string, action: string, params?: Record<string, any>) => void;
}
