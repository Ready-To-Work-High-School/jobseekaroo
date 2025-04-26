interface Window {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: Element | null;
    }) => void;
  };
}
