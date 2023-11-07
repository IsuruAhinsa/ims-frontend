import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Moment from "react-moment";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import { formatCurrency } from "../../../helpers/helper.js";

const OrderConfirmationModal = ({
  handlePlaceOrder,
  handleOrderSummeryInput,
  ...props
}) => {
  const [branch, setBranch] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);

  const getPaymentMethods = () => {
    axios
      .get(`${Constants.BASE_URL}/get-payment-methods`)
      .then((res) => {
        setPaymentMethods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.branch !== undefined) {
      setBranch(JSON.parse(localStorage.branch));
    }
    getPaymentMethods();
  }, []);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title style={{ fontSize: "17px" }}>
          Order Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card border-0">
          <Row className="px-5">
            <Col md={6}>
              {Object.keys(branch).length > 0 ? (
                <>
                  <img src={branch.logo} className="w-25" />
                  <div className="text-primary">
                    <strong>{branch.company} Branch</strong>
                  </div>
                  <div>
                    {branch.address.landmark}, {branch.address.address},{" "}
                    {branch.address.city}, {branch.address.district},{" "}
                    {branch.address.province}
                  </div>
                  <div>{branch.email}</div>
                  <div>{branch.phone}</div>
                </>
              ) : null}
            </Col>
            <Col md={6} className="text-right">
              <h4>ORDER DETAILS</h4>
            </Col>
            <Col md={12} className="text-right">
              <Moment format="DD MMMM, YYYY"></Moment>
              <div>Customer Details</div>
              {props.orderSummery.customer !== undefined && (
                <>
                  <div>{props.orderSummery.customer.split(" - ")[0]}</div>
                  <div>{props.orderSummery.customer.split(" - ")[1]}</div>
                </>
              )}
            </Col>
            <Col md={12}>
              <Table bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(props.cartItems).map((key, index) => (
                    <tr key={key}>
                      <td>{++index}</td>
                      <td>{props.cartItems[key].name}</td>
                      <td className="text-right">
                        {props.cartItems[key].quantity}
                      </td>
                      <td className="text-right">
                        {props.cartItems[key].price}
                      </td>
                      <td className="text-right">
                        {formatCurrency(
                          props.cartItems[key].quantity *
                            props.cartItems[key].original_price,
                        )}
                      </td>
                    </tr>
                  ))}
                  {props.orderSummery !== undefined && (
                    <>
                      <tr className="text-right">
                        <td colSpan={4}>Sub Total</td>
                        <td>{formatCurrency(props.orderSummery.amount)}</td>
                      </tr>
                      <tr className="text-right">
                        <td colSpan={4}>(-) Discount</td>
                        <td>-{formatCurrency(props.orderSummery.discount)}</td>
                      </tr>
                      <tr className="text-right">
                        <td colSpan={4}>Total</td>
                        <td>{formatCurrency(props.orderSummery.payable)}</td>
                      </tr>
                      <tr className="text-right">
                        <td colSpan={4}>Paid Amount</td>
                        <td className="d-flex justify-content-end">
                          <span className="mr-2 mt-1">LKR</span>
                          <Form.Control
                            type={"number"}
                            name={"paid_amount"}
                            className="form-control form-control-sm text-right"
                            min={0}
                            value={props.orderSummery.paid_amount}
                            onChange={handleOrderSummeryInput}
                          />
                        </td>
                      </tr>
                      <tr className="text-right">
                        <td colSpan={4}>Due Amount</td>
                        <td>{formatCurrency(props.orderSummery.due_amount)}</td>
                      </tr>
                      <tr className="text-right">
                        <td colSpan={4}>Payment Method</td>
                        <td>
                          <select
                            name={"payment_method_id"}
                            onChange={handleOrderSummeryInput}
                            value={props.orderSummery.payment_method}
                            className="custom-select custom-select-sm"
                          >
                            {paymentMethods.map((method, key) => (
                              <option key={key} value={method.id}>
                                {method.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      {props.orderSummery.payment_method_id != 1 ? (
                        <tr className="text-right">
                          <td colSpan={4}>Transaction ID</td>
                          <td className="d-flex justify-content-end">
                            <Form.Control
                              type={"text"}
                              name={"trx_id"}
                              className="form-control form-control-sm"
                              placeholder={"Transaction ID"}
                              value={props.orderSummery.trx_id}
                              onChange={handleOrderSummeryInput}
                            />
                          </td>
                        </tr>
                      ) : null}
                    </>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size={"sm"} onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button size={"sm"} variant="success" onClick={handlePlaceOrder}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderConfirmationModal;
