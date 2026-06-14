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
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="mx-5 mt-4 mb-4">
            <Link to="/" className="btn btn-dark">
              ← Back to Posts
            </Link>
          </div>

          <div className="post-card pt-5 mb-5">
            <p className="text-muted mb-2">
              Posted by{" "}
              <strong>
                {post.user_id?.username ||
                  post.user_id?.name ||
                  "Unknown user"}
              </strong>
            </p>

            <p className="text-muted small mb-4">
              {new Date(post.createdAt).toLocaleString()}
            </p>

            <p className="fs-5 lh-lg mb-0">
              {post.body}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostDetails;