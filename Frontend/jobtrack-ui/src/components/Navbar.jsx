import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { formatDateTime } from "../utils/format";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [reminders, setReminders] = useState([]);
  const [open, setOpen] = useState(false);

  // Keep the name in sync when the profile is edited
  useEffect(() => {
    const sync = () => setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    window.addEventListener("userUpdated", sync);
    return () => window.removeEventListener("userUpdated", sync);
  }, []);

  // Load interview reminders (next 48 hours), refresh every 5 minutes
  useEffect(() => {
    const load = () =>
      API.get("/applications/reminders")
        .then((res) => setReminders(res.data))
        .catch(() => {});
    load();
    const timer = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom px-4 py-3">

      <Link
        to="/dashboard"
        className="navbar-brand fw-bold text-primary"
      >
        <i className="bi bi-briefcase-fill me-2"></i>
        JobTrack
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">

        {/* Reminder bell */}
        <div className="position-relative">

          <button
            className="btn btn-light position-relative"
            onClick={() => setOpen(!open)}
            title="Interview reminders"
          >
            <i className="bi bi-bell"></i>

            {reminders.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {reminders.length}
              </span>
            )}
          </button>

          {open && (
            <div
              className="card shadow border-0 position-absolute end-0 mt-2"
              style={{ width: 300, zIndex: 1050 }}
            >
              <div className="card-body">

                <h6 className="fw-bold mb-3">Upcoming (next 48 hours)</h6>

                {reminders.length === 0 && (
                  <p className="text-muted small mb-0">No interviews coming up.</p>
                )}

                {reminders.map((item) => (
                  <div key={item.id} className="mb-3">
                    <div className="fw-semibold">{item.company}</div>
                    <small className="text-muted">{item.role}</small>
                    <div className="small text-primary">
                      {formatDateTime(item.interviewDate)}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}

        </div>

        <span className="text-secondary">
          <i className="bi bi-person-circle me-2"></i>
          {user.name || "User"}
        </span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right me-1"></i>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
