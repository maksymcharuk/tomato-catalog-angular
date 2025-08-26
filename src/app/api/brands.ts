import { Category } from './categories';
import { Media } from './shared';

export interface Brand {
  id: string;
  documentId: string;
  name: string;
  slug: string;
  logo: Media | null;
  categories: Category[];
}
