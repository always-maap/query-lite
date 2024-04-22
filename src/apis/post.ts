import { POSTS } from "./constants";

export async function getPost(id: string) {
  const response = await fetch(`${POSTS}/${id}`);
  return response.json();
}
