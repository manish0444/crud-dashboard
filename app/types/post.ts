export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostInput {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostInput extends CreatePostInput {
  id: number;
}
