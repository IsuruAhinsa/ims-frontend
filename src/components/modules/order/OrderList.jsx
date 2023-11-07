import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Confirm, Loading, Notify } from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import { Button, ButtonGroup } from "react-bootstrap";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import CardFooter from "../../partials/common/card/CardFooter.jsx";
import Pagination from "react-js-pagination";
import {formatCurrency} from "../../../helpers/helper.js";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  // pagination states
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // search status
  const [input, setInput] = useState({
    order_by: "created_at",
    per_page: 5,
    direction: "asc",
    search: "",
  });

  const getOrders = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/orders?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setOrders(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setTotalItemsCount(res.data.meta.total);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
        Loading.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // delete order
  const handleOrderDelete = (orderId) => {
    Confirm.show(
      "Delete",
      "Are you sure to delete this order?",
      "Yes",
      "No",
      () => {
        Loading.standard();
        axios
          .delete(`${Constants.BASE_URL}/orders/${orderId}`)
          .then((res) => {
            Notify.success(res.data.msg);
            getOrders();
            Loading.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    );
  };
  return (
    <>
      <Breadcrumb title={"Orders"} />
      <div className="row">
        <div className="container-fluid">
          <Card
            title={"All Orders"}
            to={"/order/create"}
            btnText={"Create Order"}
          >
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="search" className="form-label w-100">
                  Search
                  <input
                    className="form-control"
                    type="search"
                    placeholder={"Search..."}
                    name={"search"}
                    value={input.search}
                    onChange={handleInput}
                  />
                </label>
              </div>

              <div className="col-md-2">
                <label htmlFor="order_by" className="form-label w-100">
                  Order By
                  <select
                    className="custom-select"
                    name="order_by"
                    value={input.order_by}
                    onChange={handleInput}
                  >
                    <option value={"name"}>Name</option>
                    <option value={"created_at"}>Created at</option>
                    <option value={"updated_at"}>Updated at</option>
                    <option value={"serial"}>Serial</option>
                    <option value={"status"}>Status</option>
                  </select>
                </label>
              </div>

              <div className="col-md-2">
                <label htmlFor="direction" className="form-label w-100">
                  Direction
                  <select
                    className="custom-select"
                    name="direction"
                    value={input.direction}
                    onChange={handleInput}
                  >
                    <option value={"asc"}>ASC</option>
                    <option value={"desc"}>DESC</option>
                  </select>
                </label>
              </div>

              <div className="col-md-2">
                <label htmlFor="per_page" className="form-label w-100">
                  Per Page
                  <select
                    className="custom-select"
                    name="per_page"
                    value={input.per_page}
                    onChange={handleInput}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </label>
              </div>

              <div className="col-md-3">
                <div className="d-grid mt-4">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => getOrders(1)}
                  >
                    <i className="fas fa-search mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Order Details</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Sales</th>
                  <th scope="col">Date Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(orders).length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <th scope="row">{startFrom + index}</th>
                      <td>
                        <div>
                          Order No:{" "}
                          <span className={"text-primary font-weight-bold"}>
                            {order.order_number}
                          </span>
                        </div>
                        <div>
                          Order Status:{" "}
                          <span className={"text-primary"}>
                            {order.order_status}
                          </span>
                        </div>
                        <div>
                          Payment Status:{" "}
                          <span className={"text-primary"}>
                            {order.payment_status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          Name:{" "}
                          <span className={"text-primary"}>
                            {order.customer_name}
                          </span>
                        </div>
                        <div>
                          Phone:{" "}
                          <span className={"text-primary"}>
                            {order.customer_phone}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          Quantity:{" "}
                          <span className={"text-primary"}>
                            {order.quantity}
                          </span>
                        </div>
                        <div>
                          Sub Total:{" "}
                          <span className={"text-primary"}>
                            {formatCurrency(order.sub_total)}
                          </span>
                        </div>
                        <div>
                          Discount:{" "}
                          <span className={"text-primary"}>
                            {formatCurrency(order.discount)}
                          </span>
                        </div>
                        <div>
                          Total:{" "}
                          <span className={"text-primary"}>{formatCurrency(order.total)}</span>
                        </div>
                        <div>
                          Due Amount:{" "}
                          <span className={"text-primary"}>
                            {formatCurrency(order.due_amount)}
                          </span>
                        </div>
                        <div>
                          Paid Amount:{" "}
                          <span className={"text-primary"}>
                            {formatCurrency(order.paid_amount)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          Shop:{" "}
                          <span className={"text-primary"}>{order.shop}</span>
                        </div>
                        <div>
                          Sales Manager:{" "}
                          <span className={"text-primary"}>
                            {order.sales_manager_name}
                            <br />
                            {order.sales_manager_phone}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>Created: {order.created_at}</div>
                        <div>Updated: {order.updated_at}</div>
                      </td>
                      <td>
                        <ButtonGroup>
                          <Link to={`/order/${order.id}`}>
                            <Button>
                              <i className="fas fa-eye" />{" "}
                            </Button>
                          </Link>
                          <Button
                            variant={"danger"}
                            onClick={() => handleOrderDelete(order.id)}
                          >
                            <i className="fas fa-trash" />{" "}
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound colSpan={8} />
                )}
              </tbody>
            </table>

            <CardFooter>
              <nav className="d-flex justify-content-center pagination-sm">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={getOrders}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  prevPageText={"Prev"}
                  lastPageText={"Last"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                />
              </nav>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderList;
