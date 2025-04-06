export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  category: string;
  trending: boolean;
  views: number;
  authorName: string;
  authorImage: string;
  authorPosition: string;
  tags: string[];
  content: string | {
    introduction?: string;
    sections?: Array<{
      title: string;
      content: string;
      pattern?: string;
      quote?: {
        text: string;
        author?: string;
        role?: string;
        company?: string;
        position?: string;
      };
      accent?: {
        type: 'note' | 'highlight' | 'statistic';
        content: string;
        icon?: string;
      };
      list?: string[] | { title?: string; items: string[] };
    }>;
    conclusion?: string;
    wordCount?: number;
  };
  excerpt?: string;
  featuredImage?: string;
  publishDate?: string;
  lastUpdated?: string;
  position?: string;
} 