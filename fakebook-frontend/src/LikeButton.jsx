import { useState } from "react";
import { toggleLike } from "./api/postsApi";

function LikeButton({ post }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

    const alreadyLiked = post.likes?.some(
    (id) => id.toString() === currentUser?.id
    );

  const [liked, setLiked] = useState(alreadyLiked);
  const [likes, setLikes] = useState(post.likes?.length || 0);

  async function handleLike() {
    try {
      const data = await toggleLike(post._id);

      setLiked(data.liked);
      setLikes(data.likes);
    } catch (error) {
      console.error(error);
      alert("Failed to like post");
    }
  }

    return (
        <button
            className={liked ? "btn btn-primary btn-sm" : "btn btn-outline-primary btn-sm"}
            onClick={handleLike}
        >
            {liked ? "Liked" : "Like"}
        </button>
    );
}

export default LikeButton;