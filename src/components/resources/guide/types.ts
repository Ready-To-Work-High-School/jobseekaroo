
export interface GuideItem {
  question: string;
  answer: string;
}

export interface GuideSection {
  id: string;
  title: string;
  content: GuideItem[];
}
