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

export async function createPost(postData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL_BACKEND}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
}

export async function deletePost(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL_BACKEND}/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return await response.json();
}