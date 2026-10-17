import { useEffect, useState } from "react";
import API, { getErrorMessage } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", headline: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    API.get("/users/me").then((res) => setUser(res.data)).catch(() => {});
  }, []);

  const startEdit = () => {
    setForm({ name: user.name || "", headline: user.headline || "" });
    setMessage({ type: "", text: "" });
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.put("/users/me", form);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userUpdated"));
      setEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err, "Could not update profile") });
    }
  };

  return (
    <div>

      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <main className="main-content">

          <div className="mb-4">

            <h2 className="fw-bold">
              My Profile
            </h2>

            <p className="text-muted">
              Manage your account information.
            </p>

          </div>

          {message.text && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <div className="profile-avatar">
                {(user.name || "U").charAt(0).toUpperCase()}
              </div>

              {!editing ? (
                <>
                  <h4 className="fw-bold mt-3">{user.name}</h4>

                  <p className="text-muted">{user.headline}</p>

                  <hr />

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <small className="text-muted">Email</small>
                      <p className="fw-semibold">{user.email}</p>
                    </div>

                    <div className="col-md-6 mb-3">
                      <small className="text-muted">Role</small>
                      <p className="fw-semibold">Job Seeker</p>
                    </div>

                  </div>

                  <button className="btn btn-primary" onClick={startEdit}>
                    <i className="bi bi-pencil me-2"></i>
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSave} className="mt-3">

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Headline</label>
                    <input
                      className="form-control"
                      placeholder="e.g. Full Stack Developer"
                      value={form.headline}
                      onChange={(e) => setForm({ ...form, headline: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email (cannot be changed)</label>
                    <input className="form-control" value={user.email || ""} disabled />
                  </div>

                  <button type="submit" className="btn btn-primary me-2">
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>

                </form>
              )}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Profile;
