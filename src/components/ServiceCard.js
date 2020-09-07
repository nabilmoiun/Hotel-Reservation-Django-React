import React from "react";
export default function ServiceCard({ service, details, title }) {
  return (
    <div className="card col-md-3 service-card">
      {service}
      <div className="card-body text-center">
        <h6 className="card-title">{title}</h6>
        <p className="card-text text-justify">
          {details}
        </p>
      </div>
    </div>
  );
}
