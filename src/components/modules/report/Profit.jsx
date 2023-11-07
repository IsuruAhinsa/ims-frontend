import React from 'react';
import ReportWidget from "../../partials/common/ReportWidget.jsx";
import {formatCurrency} from "../../../helpers/helper.js";
import Card from "../../partials/common/card/Card.jsx";

const Profit = () => {
    return (
        <Card title="Expenses (Branch)">
            <div className="row d-flex justify-content-center">
                <ReportWidget
                    widgetIcon={<i className="fas fa-fw fa-chart-line fa-3x text-dark" />}
                    widgetHeading={"Total Profits"}
                    widgetSubHeading={formatCurrency(12458)}
                />

                <ReportWidget
                    widgetIcon={<i className="fas fa-fw fa-chart-area fa-3x text-dark" />}
                    widgetHeading={"Today Total Profits"}
                    widgetSubHeading={formatCurrency(12458)}
                />
            </div>
        </Card>
    );
};

export default Profit;
