import { useEffect, useState } from "react";
import API from "../services/api";
import { formatDateTime } from "../utils/format";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import ApplicationTable from "../components/ApplicationTable";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [data, setData] = useState({
    total: 0, interviews: 0, shortlisted: 0, selected: 0,
    recent: [], upcomingInterviews: []
  });

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data)).catch(() => {});
  }, []);

  const applications = data.recent;

  return (
    <div>

      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <main className="main-content">

          <div className="mb-4">

            <h2 className="fw-bold">
              Welcome back, {user.name || "there"} 👋
            </h2>

            <p className="text-muted">
              Here's an overview of your job applications.
            </p>

          </div>

          {data.upcomingInterviews.some((i) => new Date(i.interviewDate) - new Date() < 48 * 3600 * 1000) && (
            <div className="alert alert-warning d-flex align-items-center">
              <i className="bi bi-bell-fill me-2"></i>
              You have an interview in the next 48 hours. Check the upcoming interviews below!
            </div>
          )}

          <div className="row g-4 mb-4">

            <div className="col-md-6 col-xl-3">
              <StatsCard
                title="Total Applications"
                value={data.total}
                icon="bi-briefcase"
              />
            </div>

            <div className="col-md-6 col-xl-3">
              <StatsCard
                title="Interviews"
                value={data.interviews}
                icon="bi-calendar-check"
              />
            </div>

            <div className="col-md-6 col-xl-3">
              <StatsCard
                title="Shortlisted"
                value={data.shortlisted}
                icon="bi-star"
              />
            </div>

            <div className="col-md-6 col-xl-3">
              <StatsCard
                title="Selected"
                value={data.selected}
                icon="bi-check-circle"
              />
            </div>

          </div>

          <div className="row g-4 mb-4">

            <div className="col-lg-8">

              <ApplicationTable
                applications={applications}
              />

            </div>

            <div className="col-lg-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  <h5 className="fw-bold mb-4">
                    Upcoming Interviews
                  </h5>

                  {data.upcomingInterviews.length === 0 && (
                    <p className="text-muted mb-0">No upcoming interviews.</p>
                  )}

                  {data.upcomingInterviews.map((item, index) => (
                    <div key={item.id}>

                      {index > 0 && <hr />}

                      <div className="interview-item">

                        <div className="interview-icon">
                          <i className="bi bi-building"></i>
                        </div>

                        <div>
                          <h6 className="mb-1">{item.company}</h6>

                          <small className="text-muted">{item.role}</small>

                          <div className="small text-primary mt-1">
                            {formatDateTime(item.interviewDate)}
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;