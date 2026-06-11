const API_URL_BACKEND = "http://localhost:3000";

export async function updateProfile(profileData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL_BACKEND}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to update profile");
  }

  return data;
}