import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { getErrorMessage } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          <i className="bi bi-briefcase-fill"></i>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted mb-0">
            Start tracking your job applications
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit}>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            <i className="bi bi-person-plus me-2"></i>
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <span className="text-muted">
            Already have an account?{" "}
          </span>

          <Link
            to="/login"
            className="text-primary fw-semibold text-decoration-none"
          >
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;