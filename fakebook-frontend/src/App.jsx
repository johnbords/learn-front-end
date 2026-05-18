import Header from './Header.jsx'
import Footer from './Footer.jsx'
import PostCard from './PostCard.jsx';

function App() {
  return(
    <>
      <Header />
      
      <PostCard name = "John Nephi" content = "sample Post card" />

      <Footer />
    </>
  );
}

export default App
