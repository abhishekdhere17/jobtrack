import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API, { getErrorMessage } from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditApplication() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    date: "",
    status: "Applied",
    interviewDate: "",
    notes: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/applications/${id}`)
      .then(({ data }) => {
        setFormData({
          company: data.company || "",
          role: data.role || "",
          location: data.location || "",
          salary: data.salary ?? "",
          date: data.date || "",
          status: data.status || "Applied",
          interviewDate: data.interviewDate ? data.interviewDate.slice(0, 16) : "",
          notes: data.notes || ""
        });
      })
      .catch((err) => setError(getErrorMessage(err, "Could not load application")));
  }, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {
      await API.put(`/applications/${id}`, {
        ...formData,
        salary: formData.salary === "" ? null : Number(formData.salary),
        interviewDate: formData.interviewDate || null
      });
      navigate("/applications");
    } catch (err) {
      setError(getErrorMessage(err, "Could not update application"));
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
              Edit Application
            </h2>

            <p className="text-muted">
              Update your job application details.
            </p>

          </div>

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label">
                      Company Name
                    </label>

                    <input
                      type="text"
                      name="company"
                      className="form-control"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Job Role
                    </label>

                    <input
                      type="text"
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Expected Salary
                    </label>

                    <input
                      type="number"
                      name="salary"
                      className="form-control"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Applied Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option>Applied</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Interview Date
                    </label>

                    <input
                      type="datetime-local"
                      name="interviewDate"
                      className="form-control"
                      value={formData.interviewDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      Notes
                    </label>

                    <textarea
                      name="notes"
                      className="form-control"
                      rows="4"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-12">

                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                    >
                      Update Application
                    </button>

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => navigate("/applications")}
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default EditApplication;