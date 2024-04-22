import { POSTS } from "./constants";
import { Post } from "./types";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(POSTS);
  return response.json();
}
