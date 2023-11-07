import React, {useEffect, useState} from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import SalesBranch from "./SalesBranch.jsx";
import Stock from "./Stock.jsx";
import ExpenseBranch from "./ExpenseBranch.jsx";
import WithdrawalsBranch from "./WithdrawalsBranch.jsx";
import Profit from "./Profit.jsx";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import {Loading} from "notiflix";

const Report = () => {
  const [report, setReport] = useState([]);

  const getReport = () => {
    Loading.standard()
    axios.get(`${Constants.BASE_URL}/get-reports`).then(res => {
      setReport(res.data)
      Loading.remove()
    }).catch(err => {
      console.log(err)
      Loading.remove()
    })
  }

  useEffect(() => {
    getReport()
  }, []);
  return (
    <>
      <Breadcrumb title={"Reports"} />
      <div className="row">
        <div className="container-fluid">
          <Card title={"Reports"}>
            <SalesBranch report={report} />
            <br />
            <Stock report={report} />
            <br />
            <ExpenseBranch />
            <br />
            <WithdrawalsBranch />
            <br />
            <Profit />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Report;
