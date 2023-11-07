import React from 'react';
import {formatCurrency} from "../../../helpers/helper.js";
import Card from "../../partials/common/card/Card.jsx";
import ReportWidget from "../../partials/common/ReportWidget.jsx";

const Stock = ({report}) => {
    return (
        <Card title="Stock">
            <div className="row d-flex justify-content-center">
                <ReportWidget
                    widgetIcon={
                        <i className="fas fa-fw fa-box-open fa-3x text-dark" />
                    }
                    widgetHeading={"Total Products"}
                    widgetSubHeading={report.total_products}
                />

                <ReportWidget
                    widgetIcon={
                        <i className="fas fa-fw fa-box fa-3x text-dark" />
                    }
                    widgetHeading={"Total Stock"}
                    widgetSubHeading={report.total_stock}
                />

                <ReportWidget
                    widgetIcon={
                        <i className="fas fa-fw fa-battery-quarter fa-3x text-dark" />
                    }
                    widgetHeading={"Total Low Stock"}
                    widgetSubHeading={report.low_stock}
                />

                <ReportWidget
                    widgetIcon={
                        <i className="fas fa-fw fa-dollar-sign fa-3x text-dark" />
                    }
                    widgetHeading={"Total Stock Value (Buy)"}
                    widgetSubHeading={formatCurrency(report.buy_value)}
                />

                <ReportWidget
                    widgetIcon={
                        <i className="fas fa-fw fa-coins fa-3x text-dark" />
                    }
                    widgetHeading={"Total Stock Value (Sale WOD)"}
                    widgetSubHeading={formatCurrency(report.sale_value)}
                />

                <ReportWidget
                    widgetIcon={
                        <i className="fas fa-fw fa-cash-register fa-3x text-dark" />
                    }
                    widgetHeading={"Possible Profit"}
                    widgetSubHeading={formatCurrency(report.possible_profit)}
                />
            </div>
        </Card>
    );
};

export default Stock;
