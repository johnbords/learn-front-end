import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CommentDetails() {
  const { id } = useParams();
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComment(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!comment) {
    return (
      <div className="container mt-5 pt-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <Link to="/comments" className="btn btn-secondary mb-3">
        Back to Comments
      </Link>

      <div className="card">
        <div className="card-body">
          <h3>Comment Details</h3>

          <hr />

          <p>
            <strong>Body:</strong>
            <br />
            {comment.body}
          </p>

          <p>
            <strong>Post ID:</strong>
            <br />
            {comment.post_id}
          </p>

          <p>
            <strong>User ID:</strong>
            <br />
            {comment.user_id}
          </p>

          <p>
            <strong>Created:</strong>
            <br />
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommentDetails;