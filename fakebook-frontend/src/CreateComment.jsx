import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateComment() {
  const [body, setBody] = useState("");
  const [postId, setPostId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:3000/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            body,
            post_id: postId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      navigate("/comments");
    } catch (err) {
      console.error(err);
      alert("Failed to create comment");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h1>Create Comment</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Comment Body
          </label>

          <textarea
            className="form-control"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Post ID
          </label>

          <input
            type="text"
            className="form-control"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Comment
        </button>
      </form>
    </div>
  );
}

export default CreateComment;