export type Category =
  | 'Story Telling'
  | 'Event Recaps'
  | 'Promotions'
  | 'Live Streams'
  | 'Other';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: Category;
  videoProvider: 'youtube' | 'wistia' | 'link';
  videoId: string;
  thumbnailUrl: string;
  featured?: boolean;
  externalUrl?: string;
}

export interface CategoryDef {
  label: Category | 'All';
  slug: string;
}
