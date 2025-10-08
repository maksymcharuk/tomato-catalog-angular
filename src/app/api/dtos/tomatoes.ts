export interface CreateTomatoDto {
  name: string;
  description?: string;
  price?: number;
  images?: number[];
  primaryImage?: number;
}

export interface UpdateTomatoDto {
  documentId: string;
  changes: Partial<CreateTomatoDto>;
}
