import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import { Loading } from "notiflix";
import { Tab, Table, Tabs } from "react-bootstrap";
import { formatCurrency } from "../../../helpers/helper.js";

const OrderDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState([]);

  const getOrder = () => {
    Loading.standard();
    axios
      .get(`${Constants.BASE_URL}/orders/${params.id}`)
      .then((res) => {
        setOrder(res.data.data);
        Loading.remove();
      })
      .catch((err) => {
        console.log(err);
        Loading.remove();
      });
  };

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <Breadcrumb title={"Order Details"} />
      <div className="container-fluid">
        <Card to={"/order"} title={order.order_number} btnText={"All Orders"}>
          <Tabs
            defaultActiveKey="customer"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="customer" title="Customer Details">
              <Table size={"sm"} bordered responsive striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.customer?.name}</td>
                    <td>{order.customer?.phone}</td>
                    <td>{order.customer?.email}</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="shop" title="Shop Details">
              <Table size={"sm"} bordered responsive striped>
                <thead>
                  <tr>
                    <th>Shop</th>
                    <th>Sales Manager</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={order.shop?.logo}
                        alt={order.shop?.logo}
                        className="img-thumbnail"
                        style={{ width: "75px" }}
                      />
                      <span className="ml-3">{order.shop?.company}</span>
                    </td>
                    <td>
                      <img
                        src={order.sales_manager?.photo}
                        alt={order.sales_manager?.photo}
                        className="img-thumbnail"
                        style={{ width: "75px" }}
                      />
                      <span className="ml-3">{order.sales_manager?.name}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="order-items" title="Order Items Details">
              <Table size={"sm"} bordered responsive striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Info</th>
                    <th>Quantity</th>
                    <th>Photo</th>
                    <th>Amount</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.order_details?.map((product, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>
                        <div>{product.name}</div>
                        <div>SKU: {product.sku}</div>
                        <div>Supplier: {product.supplier}</div>
                      </td>
                      <td>
                        <div>Brand: {product.brand}</div>
                        <div>Category: {product.category}</div>
                        <div>Sub Category: {product.sub_category}</div>
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        <img
                          src={product.photo}
                          alt={product.photo}
                          className="img-thumbnail"
                          style={{ width: "75px" }}
                        />
                      </td>
                      <td>
                        <div>Original Price: {product?.price}</div>
                        <div>Discount: {product?.sale_price.discount}</div>
                        <div>Sale Price: {product?.sale_price.price}</div>
                      </td>
                      <td>
                        {formatCurrency(
                          product?.sale_price?.price * product?.quantity,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="order-summery" title="Order Summery">
              <Table size={"sm"} bordered responsive striped>
                <tbody>
                  <tr>
                    <th>Order Number</th>
                    <td>{order.order_number}</td>
                    <th>Total Items</th>
                    <td>{order.quantity}</td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>{order.order_status}</td>
                    <th>Payment Status</th>
                    <td>{order.payment_status}</td>
                  </tr>
                  <tr>
                    <th>Payment Method</th>
                    <td>{order?.payment_method?.name}</td>
                    <th>Account Number</th>
                    <td>{order?.payment_method?.account_number || "-"}</td>
                  </tr>
                  <tr>
                    <th>Sub Total</th>
                    <td>{formatCurrency(order?.sub_total)}</td>
                    <th>Discount</th>
                    <td>{formatCurrency(order?.discount)}</td>
                  </tr>
                  <tr>
                    <th colSpan={2}>Total</th>
                    <td colSpan={2}>{formatCurrency(order?.total)}</td>
                  </tr>
                  <tr>
                    <th>Paid Amount</th>
                    <td>{formatCurrency(order?.paid_amount)}</td>
                    <th>Due Amount</th>
                    <td>{formatCurrency(order?.due_amount)}</td>
                  </tr>
                  <tr>
                    <th>Order Placed</th>
                    <td>{order.created_at}</td>
                    <th>Order Updated</th>
                    <td>{order.updated_at}</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="transactions" title="Transactions">
              <Table size={"sm"} bordered responsive striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Customer</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                    <th>Transaction By</th>
                    <th>Transaction At</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.transactions?.map((transaction, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{transaction.trx_id}</td>
                      <td>{formatCurrency(transaction.amount)}</td>
                      <td>
                        <div>{transaction.customer_name}</div>
                        <div>{transaction.customer_phone}</div>
                      </td>
                      <td>{transaction.payment_method_name}</td>
                      <td>{transaction?.status}</td>
                      <td>{transaction?.transaction_by}</td>
                      <td>{transaction?.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default OrderDetails;
