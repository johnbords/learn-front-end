import { useEffect, useState } from "react";
import { getPosts } from "./api/postsApi";
import PostCard from "./PostCard.jsx";

// const posts = [
//     { id: 1, name: "John Nephi", content: "My first post!" },
//     { id: 2, name: "Revie", content: "I am learning React rn!" },
// ];

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
    }, [])

    if (loading) return <h2>Loading posts...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <main className="container pt-5 mt-3">
            {posts.map((post) =>(
                <PostCard 
                    key={post.id}
                    name={post.title}
                    content={post.body}
                />
            ))}
            {/* {posts.map(post => (
                <PostCard 
                    key={post.id}
                    name={post.name}
                    content={post.content}
                />
            ))} */}
        </main>
    );
}

export default Home;