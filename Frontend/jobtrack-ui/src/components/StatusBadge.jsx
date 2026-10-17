function StatusBadge({ status }) {

    const statusClass = {
      Applied: "status-applied",
      Shortlisted: "status-shortlisted",
      Interview: "status-interview",
      Selected: "status-selected",
      Rejected: "status-rejected"
    };
  
    return (
      <span className={`status-badge ${statusClass[status] || ""}`}>
        {status}
      </span>
    );
  }
  
  export default StatusBadge;