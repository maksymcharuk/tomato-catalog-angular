export interface CreateTomatoDto {
  name: string;
  description?: string;
  price?: number;
  images?: File[];
  primaryImage?: File;
}

interface UpdateTomatoChangesDto
  extends Partial<Omit<CreateTomatoDto, 'images' | 'primaryImage'>> {
  images?: (File | number)[];
  primaryImage?: File | number;
}

export interface UpdateTomatoDto {
  documentId: string;
  changes: UpdateTomatoChangesDto;
}
