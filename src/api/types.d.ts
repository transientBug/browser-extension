export interface Bookmark {
  id?: string | number;
  title: string;
  url: string;
  tags: string[];
  description: string;
  [keys: string]: any;
}
