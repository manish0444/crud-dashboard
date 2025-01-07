import axios from 'axios';
import { Post, CreatePostInput, UpdatePostInput } from '../types/post';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (post: CreatePostInput): Promise<Post> => {
  const response = await axios.post(`${API_BASE_URL}/posts`, post, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.data;
};

export const updatePost = async (post: UpdatePostInput): Promise<Post> => {
  const response = await axios.put(`${API_BASE_URL}/posts/${post.id}`, post, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`);
};
