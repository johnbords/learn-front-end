import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setBody(data.body);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: "Post",
            body,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      navigate(`/posts/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update post");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="container py-5">
      <div className="post-card">
        <h2>Edit Post</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditPost;