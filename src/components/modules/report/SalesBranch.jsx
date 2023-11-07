import React from "react";
import { formatCurrency } from "../../../helpers/helper.js";
import Card from "../../partials/common/card/Card.jsx";
import ReportWidget from "../../partials/common/ReportWidget.jsx";

const SalesBranch = ({ report }) => {
  return (
    <Card title="Sales(Branch)">
      <div className="row d-flex justify-content-center">
        <ReportWidget
          widgetIcon={
            <i className="fas fa-fw fa-shopping-cart fa-3x text-dark" />
          }
          widgetHeading={"Total Sales"}
          widgetSubHeading={formatCurrency(report?.total_sale)}
        />

        <ReportWidget
          widgetIcon={
            <i className="fas fa-fw fa-shopping-bag fa-3x text-dark" />
          }
          widgetHeading={"Total Purchase"}
          widgetSubHeading={formatCurrency(report.total_purchase)}
        />

        <ReportWidget
          widgetIcon={
            <i className="fas fa-fw fa-hand-holding-usd fa-3x text-dark" />
          }
          widgetHeading={"Today's Sale"}
          widgetSubHeading={formatCurrency(report?.total_sale_today)}
        />

        <ReportWidget
          widgetIcon={<i className="fas fa-fw fa-cart-plus fa-3x text-dark" />}
          widgetHeading={"Today's Purchase"}
          widgetSubHeading={formatCurrency(report?.total_purchase_today)}
        />
      </div>
    </Card>
  );
};

export default SalesBranch;
