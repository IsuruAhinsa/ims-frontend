import React from 'react';
import ReportWidget from "../../partials/common/ReportWidget.jsx";
import {formatCurrency} from "../../../helpers/helper.js";
import Card from "../../partials/common/card/Card.jsx";

const WithdrawalsBranch = () => {
    return (
        <Card title="Withdrawals (Branch)">
            <div className="row d-flex justify-content-center">
                <ReportWidget
                    widgetIcon={<i className="fas fa-fw fa-external-link-alt fa-3x text-dark" />}
                    widgetHeading={"Total Withdrawals"}
                    widgetSubHeading={formatCurrency(12458)}
                />

                <ReportWidget
                    widgetIcon={<i className="fas fa-fw fa-door-open fa-3x text-dark" />}
                    widgetHeading={"Today Total Withdrawals"}
                    widgetSubHeading={formatCurrency(12458)}
                />
            </div>
        </Card>
    );
};

export default WithdrawalsBranch;
