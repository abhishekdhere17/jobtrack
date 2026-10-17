import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../utils/format";

function ApplicationTable({ applications = [] }) {

  return (
    <div className="card border-0 shadow-sm">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h5 className="fw-bold mb-0">
            Recent Applications
          </h5>

          <Link
            to="/applications"
            className="btn btn-sm btn-outline-primary"
          >
            View All
          </Link>

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
                <th></th>
              </tr>
            </thead>

            <tbody>

              {applications.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-muted py-5"
                  >
                    No applications found.
                  </td>
                </tr>

              ) : (

                applications.map((application) => (

                  <tr key={application.id}>

                    <td className="fw-semibold">
                      {application.company}
                    </td>

                    <td>
                      {application.role}
                    </td>

                    <td>
                      {application.location}
                    </td>

                    <td>
                      {formatDate(application.date)}
                    </td>

                    <td>
                      <StatusBadge status={application.status} />
                    </td>

                    <td>
                      <Link
                        to={`/applications/edit/${application.id}`}
                        className="btn btn-sm btn-light"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ApplicationTable;