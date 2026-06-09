const API_URL_BACKEND = "http://localhost:3000";

export async function getPosts() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:3000/posts",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await response.json();
}