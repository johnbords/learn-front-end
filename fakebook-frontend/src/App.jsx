import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';

function App() {
  return(
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App
