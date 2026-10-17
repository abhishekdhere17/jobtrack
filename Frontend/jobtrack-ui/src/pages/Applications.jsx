import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import API, { getErrorMessage } from "../services/api";
import { formatDate } from "../utils/format";

function Applications() {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/applications")
      .then(({ data }) => setApplications(data))
      .catch((err) => setError(getErrorMessage(err, "Could not load applications")));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await API.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete application"));
    }
  };

  const filteredApplications = applications.filter((item) => {

    const matchesSearch =
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>

      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <main className="main-content">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="fw-bold">
                Applications
              </h2>

              <p className="text-muted">
                Manage all your job applications.
              </p>
            </div>

            <Link
              to="/applications/add"
              className="btn btn-primary"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Add Application
            </Link>

          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <div className="row g-3 mb-4">

                <div className="col-md-6">

                  <div className="input-group">

                    <span className="input-group-text bg-white">
                      <i className="bi bi-search"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search company or job role..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="col-md-3">

                  <select
                    className="form-select"
                    value={filter}
                    onChange={(e) =>
                      setFilter(e.target.value)
                    }
                  >
                    <option>All</option>
                    <option>Applied</option>
                    <option>Shortlisted</option>
                    <option>Interview</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                  </select>

                </div>

              </div>

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>
                      <th>Company</th>
                      <th>Job Role</th>
                      <th>Location</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredApplications.map((item) => (

                      <tr key={item.id}>

                        <td className="fw-semibold">
                          {item.company}
                        </td>

                        <td>
                          {item.role}
                        </td>

                        <td>
                          {item.location}
                        </td>

                        <td>
                          {formatDate(item.date)}
                        </td>

                        <td>
                          <StatusBadge status={item.status} />
                        </td>

                        <td>

                          <Link
                            to={`/applications/edit/${item.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Applications;