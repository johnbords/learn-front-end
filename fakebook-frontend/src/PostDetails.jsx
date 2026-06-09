import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <main className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Posts
      </Link>

      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{post.title}</h1>

          <p className="card-text">{post.body}</p>

          {post.user_id && (
            <p className="text-muted">
              Posted by:{" "}
              {post.user_id.username || post.user_id.name || "Unknown user"}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default PostDetails;