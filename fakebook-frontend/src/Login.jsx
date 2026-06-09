import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container" style={{ paddingTop: "100px" }}>
      <div className="row justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <h1 className="text-center mb-3">Welcome to Fakebook!</h1>

          <p className="text-center mb-4">
            Log in or sign up to continue.
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <input
              className="form-control mb-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </form>

          <button
            className="btn btn-dark w-100 mt-3"
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/github";
            }}
          >
            Login with GitHub
          </button>

          <p className="text-center mt-4">
            No account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;