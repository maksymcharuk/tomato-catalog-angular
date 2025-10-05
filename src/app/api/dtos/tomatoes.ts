export interface CreateTomatoDto {
  name: string;
  description: string;
  price: number;
  // images: string[];
  // primaryImage: string;
}

export interface UpdateTomatoDto {
  documentId: string;
  changes: Partial<Omit<CreateTomatoDto, 'images' | 'primaryImage'>>;
}
