import { useEffect, useState } from "react";
import { getPosts, createPost, deletePost } from "./api/postsApi";
import PostCard from "./PostCard.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPostBox, setShowPostBox] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [showToast, setShowToast] = useState(false);
  
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

    async function handlePostSubmit(e) {
        e.preventDefault();

        if (!postBody.trim()) return;

        try {
            const newPost = await createPost({
            title: "Post",
            body: postBody,
            });

            setPosts((prevPosts) => [newPost, ...prevPosts]);

            setPostBody("");
            setShowPostBox(false);

            setShowToast(true);

            setTimeout(() => {
            setShowToast(false);
            }, 3000);

        } catch (error) {
            console.error(error);
            alert("Failed to create post");
        }
    }

    async function handleDeletePost(postId) {
        try {
            await deletePost(postId);

            setPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== postId)
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete post");
        }
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
            key={post._id}
            name={`${post.user_id?.username}`}
            content={post.body}
            post={post}
            onDelete={handleDeletePost}
        />
      ))}

      {showToast && (
        <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1050 }}
        >
            <div
            className="toast show text-bg-success border-0"
            role="alert"
            >
            <div className="d-flex">
                <div className="toast-body">
                ✅ Post created successfully!
                </div>

                <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
                />
            </div>
            </div>
        </div>
        )}
    </main>
  );
}

export default Home;