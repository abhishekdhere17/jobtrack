import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { getErrorMessage } from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="text-center mb-4">

          <div className="auth-logo">
            <i className="bi bi-briefcase-fill"></i>
          </div>

          <h2 className="fw-bold">
            Welcome to JobTrack
          </h2>

          <p className="text-muted">
            Track your job search in one place.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="mb-3">

            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4 mb-0">

          Don't have an account?

          <Link
            to="/register"
            className="text-primary fw-semibold ms-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;