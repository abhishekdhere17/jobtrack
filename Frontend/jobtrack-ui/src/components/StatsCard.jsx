function StatsCard({ title, value, icon, className }) {

    return (
      <div className={`card stats-card ${className || ""}`}>
  
        <div className="card-body d-flex justify-content-between align-items-center">
  
          <div>
            <p className="text-muted mb-2">
              {title}
            </p>
  
            <h2 className="fw-bold mb-0">
              {value}
            </h2>
          </div>
  
          <div className="stats-icon">
            <i className={`bi ${icon}`}></i>
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default StatsCard;