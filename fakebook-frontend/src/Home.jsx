import { useEffect, useState } from "react";
import { getPosts } from "./api/postsApi";
import PostCard from "./PostCard.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPostBox, setShowPostBox] = useState(false);
  const [postBody, setPostBody] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Could not load posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  function handlePostSubmit(e) {
    e.preventDefault();

    if (!postBody.trim()) return;

    console.log("New post:", postBody);

    setPostBody("");
    setShowPostBox(false);
  }

  if (loading) return <h2>Loading posts...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <main className="container pt-5 mt-3">
      <div className="post-card">
        <div className="card-body">
          {!showPostBox ? (
            <button
              type="button"
              className="form-control text-start rounded-pill text-muted"
              onClick={() => setShowPostBox(true)}
            >
              What's on your mind?
            </button>
          ) : (
            <form onSubmit={handlePostSubmit}>
              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="What's on your mind?"
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                autoFocus
              />

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowPostBox(false);
                    setPostBody("");
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          name={post.title}
          content={post.body}
        />
      ))}
    </main>
  );
}

export default Home;