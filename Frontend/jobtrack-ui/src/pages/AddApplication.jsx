import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { getErrorMessage } from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddApplication() {

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
      await API.post("/applications", {
        ...formData,
        salary: formData.salary === "" ? null : Number(formData.salary),
        interviewDate: formData.interviewDate || null
      });
      navigate("/applications");
    } catch (err) {
      setError(getErrorMessage(err, "Could not save application"));
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
              Add Job Application
            </h2>

            <p className="text-muted">
              Add a new job application to your tracker.
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
                      placeholder="e.g. TCS"
                      value={formData.company}
                      onChange={handleChange}
                      required
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
                      placeholder="e.g. Java Developer"
                      value={formData.role}
                      onChange={handleChange}
                      required
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
                      placeholder="e.g. Pune"
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
                      placeholder="e.g. 500000"
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
                      required
                    />

                  </div>

                  <div className="col-md-6">

                    <label className="form-label">
                      Application Status
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
                      placeholder="Add notes about this application..."
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>

                  </div>

                  <div className="col-12">

                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                    >
                      <i className="bi bi-check-lg me-2"></i>
                      Save Application
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

export default AddApplication;