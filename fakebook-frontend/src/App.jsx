import Header from './Header.jsx'
import Footer from './Footer.jsx'
import PostCard from './PostCard.jsx';

{/* Lists and Keys for sample posts - DELETE THIS LATER */}
const posts = [
  { id: 1, name: "John Nephi", content: "My first post!" },
  { id: 2, name: "Revie", content: "React is fun." },
];

function App() {
  return(
    <>
      <Header />

      <main className="pt-5 mt-3">
        {/* Sample Posts - DELETE THIS LATER */}
        {posts.map(post => (
          <PostCard key={post.id} name={post.name} content={post.content} />
        ))}
      </main>
      
      <Footer />
    </>
  );
}

export default App
