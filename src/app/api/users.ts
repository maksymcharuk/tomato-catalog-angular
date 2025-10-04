export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  provider: string;
  publishedAt: string;
  updatedAt: string;
  username: string;
}

export interface UserResponse {
  jwt: string;
  user: User;
}
