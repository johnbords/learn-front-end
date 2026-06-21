import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import PostDetails from "./PostDetails";
import ProtectedRoute from "./ProtectedRoute";
import OAuthSuccess from "./OAuthSuccess";
import GuestRoute from "./GuestRoute";
import EditPost from "./EditPost";

function App() {
  return(
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/posts/:id/edit"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />

        </Routes>
        
        <Footer />
      </div>
    </>
  );
}

export default App
