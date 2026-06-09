const API_URL_BACKEND = "http://localhost:3000";

export async function getPosts() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL_BACKEND}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await response.json();
}

export async function getPostById(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL_BACKEND}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return await response.json();
}