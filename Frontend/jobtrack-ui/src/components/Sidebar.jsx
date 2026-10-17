import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <div className="sidebar">

      <div className="sidebar-title">
        JOBTRACK
      </div>

      <NavLink
        to="/dashboard"
        className="sidebar-link"
      >
        <i className="bi bi-grid me-3"></i>
        Dashboard
      </NavLink>

      <NavLink
        to="/applications"
        className="sidebar-link"
      >
        <i className="bi bi-file-earmark-text me-3"></i>
        Applications
      </NavLink>

      <NavLink
        to="/applications/add"
        className="sidebar-link"
      >
        <i className="bi bi-plus-circle me-3"></i>
        Add Application
      </NavLink>

      <NavLink
        to="/profile"
        className="sidebar-link"
      >
        <i className="bi bi-person me-3"></i>
        Profile
      </NavLink>

    </div>
  );
}

export default Sidebar;