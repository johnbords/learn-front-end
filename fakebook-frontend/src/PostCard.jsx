import "./PostCard.css";
import LikeButton from "./LikeButton.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function PostCard({ name, content, post, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editBody, setEditBody] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const isOwner = currentUser?.id === post.user_id?._id;
  const isAdmin = currentUser?.role === "admin";

  async function fetchComments() {
    const response = await fetch(
      `http://localhost:3000/comments/post/${post._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setComments([]);
      return;
    }

    setComments(Array.isArray(data) ? data : []);
  }

  async function handleCommentsClick() {
    const nextValue = !showComments;
    setShowComments(nextValue);

    if (nextValue) {
      fetchComments();
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        body: commentBody,
        post_id: post._id,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to add comment");
      return;
    }

    toast.success("Comment added");
    setCommentBody("");
    fetchComments();
  }

  async function handleDeleteComment(commentId) {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      toast.error("Failed to delete comment");
      return;
    }

    toast.success("Comment deleted");
    fetchComments();
  }

  async function handleUpdateComment(commentId) {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body: editBody,
        }),
      }
    );

    if (!response.ok) {
      toast.error("Failed to update comment");
      return;
    }

    toast.success("Comment updated");
    setEditingCommentId(null);
    setEditBody("");
    fetchComments();
  }

  return (
    <div className="post-card">
      <h3>{name}</h3>

      <p>{content}</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <LikeButton post={post} />

        <button
          className="btn btn-outline-dark btn-sm"
          onClick={handleCommentsClick}
        >
          Comments
        </button>

        <Link to={`/posts/${post._id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>

        {isOwner && (
          <Link to={`/posts/${post._id}/edit`} className="btn btn-warning btn-sm">
            Edit
          </Link>
        )}

        {(isOwner || isAdmin) && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(post._id)}
          >
            Delete
          </button>
        )}
      </div>

      {showComments && (
        <div className="comments-section mt-4">
          <form onSubmit={handleAddComment} className="mb-3">
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder="Write a comment..."
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              required
            />

            <button className="btn btn-dark btn-sm" type="submit">
              Add Comment
            </button>
          </form>

          {comments.length === 0 ? (
            <p className="text-muted mb-0">No comments yet.</p>
          ) : (
            comments.map((comment) => {
              const commentOwner =
                currentUser?.id === comment.user_id?._id;

              return (
                <div key={comment._id} className="border-top pt-2 mb-3">
                  {editingCommentId === comment._id ? (
                    <>
                      <textarea
                        className="form-control mb-2"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                      />

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdateComment(comment._id)}
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditBody("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="mb-1">{comment.body}</p>

                      <small className="text-muted">
                        By{" "}
                        <strong>
                          {comment.user_id?.username ||
                            comment.user_id?.name ||
                            "Unknown user"}
                        </strong>
                      </small>

                      {(commentOwner || isAdmin) && (
                        <div className="mt-2">
                          {commentOwner && (
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => {
                                setEditingCommentId(comment._id);
                                setEditBody(comment.body);
                              }}
                            >
                              Edit
                            </button>
                          )}

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;