import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfile } from "./api/usersApi";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const [openSection, setOpenSection] = useState(null);

  const [profileForm, setProfileForm] = useState({
    name: storedUser?.name || "",
    username: storedUser?.username || "",
    email: storedUser?.email || "",
    currentPassword: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await updateProfile(profileForm);

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setProfileForm({
        name: data.user.name,
        username: data.user.username,
        email: data.user.email,
        currentPassword: "",
      });

      setMessage("Profile updated successfully.");
      setOpenSection(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to change password");
      }

      setPasswordForm({
        currentPassword: "",
        password: "",
      });

      setMessage("Password changed successfully.");
      setOpenSection(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="container pt-5 mt-5 text-center">
        <h2>You are not logged in.</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </main>
    );
  }

  return (
    <main className="container pt-5 mt-5">
      <section className="text-center mb-5">
        <h1 className="fw-bold">
          {user.name} <span className="text-muted">({user.username})</span>
        </h1>
        <p className="text-muted">{user.email}</p>
      </section>

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="accordion" id="profileAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${
                openSection === "editProfile" ? "" : "collapsed"
              }`}
              type="button"
              onClick={() =>
                setOpenSection(
                  openSection === "editProfile" ? null : "editProfile"
                )
              }
            >
              Edit Profile
            </button>
          </h2>

          <AnimatePresence initial={false}>
            {openSection === "editProfile" && (
              <motion.div
                key="editProfile"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="accordion-body">
                  <form onSubmit={handleUpdateProfile}>
                    <div className="mb-3">
                      <label className="form-label">Real Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={profileForm.username}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        className="form-control"
                        value={profileForm.currentPassword}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${
                openSection === "changePassword" ? "" : "collapsed"
              }`}
              type="button"
              onClick={() =>
                setOpenSection(
                  openSection === "changePassword" ? null : "changePassword"
                )
              }
            >
              Change Password
            </button>
          </h2>

          <AnimatePresence initial={false}>
            {openSection === "changePassword" && (
              <motion.div
                key="changePassword"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="accordion-body">
                  <form onSubmit={changePassword}>
                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        className="form-control"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={passwordForm.password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-warning">
                      Change Password
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 text-start">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </main>
  );
}

export default Profile;