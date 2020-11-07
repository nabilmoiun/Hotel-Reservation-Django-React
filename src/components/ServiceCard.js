import React from "react";
export default function ServiceCard({ service, details, title }) {
  return (
    <div className="col-md-3 mb-1">
      <div className="card service-card">
      {service}
      <div className="card-body text-center">
        <h6 className="card-title">{title}</h6>
        <p className="card-text text-justify">
          {details}
        </p>
      </div>
    </div>
    </div>
    
  );
}
