import axios from "axios";
import type { BlogPost } from "../types";
import type { PostInput } from "../lib/blogStore";
import { API_BASE_URL, AUTH_STORAGE_KEY } from "../authConfig";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export async function getBlogPosts(): Promise<BlogPost[]> {
  const token = localStorage.getItem(AUTH_STORAGE_KEY)
  const response = await api.get<BlogPost[]>('/blogs', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return response.data
}

export async function createBlogPost(input: PostInput): Promise<BlogPost> {
  const token = localStorage.getItem(AUTH_STORAGE_KEY)
  const response = await api.post<BlogPost>('/blogs', input, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return response.data
}