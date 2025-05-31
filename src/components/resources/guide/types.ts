
export interface GuideSection {
  id: string;
  title: string;
  content: GuideItem[];
}

export interface GuideItem {
  question: string;
  answer: string;
}
