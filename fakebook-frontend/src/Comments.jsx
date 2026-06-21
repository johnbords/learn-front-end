import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-4">Comments</h1>

      <Link to="/comments/create" className="btn btn-primary mb-4">
        Create Comment
      </Link>

      {comments.map((comment) => (
        <div key={comment._id} className="card mb-3">
          <div className="card-body">
            <h6>
              {comment.user_id?.name || "Unknown User"}
            </h6>

            <p>{comment.body}</p>

            <small className="text-muted">
              {new Date(comment.createdAt).toLocaleDateString()}
            </small>

            <br />

            <Link
              to={`/comments/${comment._id}`}
              className="btn btn-outline-primary btn-sm mt-2"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;