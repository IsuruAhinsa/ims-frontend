import React from "react";

const ReportWidget = ({ widgetHeading, widgetSubHeading, widgetIcon }) => {
  return (
    <div
      className="d-flex align-items-center border p-4 rounded shadow-sm m-2"
      style={{ width: "250px", height: "100px" }}
    >
      <div className="flex-shrink-0">{widgetIcon}</div>
      <div className="flex-grow-1 ml-1">
        <div className="font-weight-bold">{widgetHeading}</div>
        <div className="h5 text-primary">{widgetSubHeading}</div>
      </div>
    </div>
  );
};

export default ReportWidget;
