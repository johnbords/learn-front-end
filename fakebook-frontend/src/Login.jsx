import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // DELETE THIS BEFORE DEPLOYING
        console.log('Login: ', email, password);
    }

    return (
        <main className="container" style={{ paddingTop: "100px" }}>
            <div className="row justify-content-center">
                <div className="col-11 col-sm-8 col-md-6 col-lg-4">
                    <h1 className="text-center mb-4">Login</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <input 
                            className="form-control mb-3"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <input
                            className="form-control mb-3"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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