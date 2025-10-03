import { Media } from './shared';

export interface Tomato {
  id: string;
  documentId: string;
  name: string;
  description: string;
  images: Media[];
  primaryImage: Media;
}
