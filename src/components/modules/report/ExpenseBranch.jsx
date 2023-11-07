import React from "react";
import { formatCurrency } from "../../../helpers/helper.js";
import Card from "../../partials/common/card/Card.jsx";
import ReportWidget from "../../partials/common/ReportWidget.jsx";

const ExpenseBranch = () => {
  return (
    <Card title="Expenses (Branch)">
      <div className="row d-flex justify-content-center">
        <ReportWidget
          widgetIcon={<i className="fas fa-fw fa-euro-sign fa-3x text-dark" />}
          widgetHeading={"Total Expenses"}
          widgetSubHeading={formatCurrency(12458)}
        />

        <ReportWidget
          widgetIcon={<i className="fas fa-fw fa-wallet fa-3x text-dark" />}
          widgetHeading={"Total Expenses Today"}
          widgetSubHeading={formatCurrency(12458)}
        />
      </div>
    </Card>
  );
};

export default ExpenseBranch;
