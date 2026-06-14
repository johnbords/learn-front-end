import "./PostCard.css";
import LikeButton from "./LikeButton.jsx";
import { Link } from "react-router-dom";

function PostCard({
  name,
  content,
  post,
  onDelete,
}) {
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const isOwner =
    currentUser?.id === post.user_id?._id;

  const isAdmin =
    currentUser?.role === "admin";

  return (
    <div className="post-card">
      <h3>{name}</h3>

      <p>{content}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <LikeButton post={post} />

        <Link
          to={`/posts/${post._id}`}
          className="btn btn-primary btn-sm"
        >
          View Details
        </Link>

        {(isOwner || isAdmin) && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(post._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCard;