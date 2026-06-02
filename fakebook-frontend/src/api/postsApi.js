const API_URL_BACKEND = "http://localhost:3000";

// async tells JS that this function may take some time to complete, 
// and that it should not block the rest of the code from running 
// while it waits for the result
export async function getPosts() {
    // await means "pause this function here until the operation finishes."
    const response = await fetch(`${API_URL_BACKEND}/posts`);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return await response.json();
}