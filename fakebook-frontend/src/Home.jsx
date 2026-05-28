import PostCard from "./PostCard.jsx";

const posts = [
    { id: 1, name: "John Nephi", content: "My first post!" },
    { id: 2, name: "Revie", content: "I am learning React rn!" },
];

function Home() {
    return (
        <main className="pt-5 mt-3">
            {posts.map(post => (
                <PostCard 
                    key={post.id}
                    name={post.name}
                    content={post.content}
                />
            ))}
        </main>
    );
}

export default Home;