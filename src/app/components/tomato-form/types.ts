export interface CreateTomatoDto {
  name: string;
  description?: string;
  price?: number;
  images?: File[];
  primaryImage?: File;
}

export interface UpdateTomatoDto {
  documentId: string;
  changes: Partial<CreateTomatoDto>;
}
