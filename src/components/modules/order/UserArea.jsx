import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import OrderConfirmationModal from "./OrderConfirmationModal.jsx";

const UserArea = ({
  setModalShow,
  customers,
  selectCustomer,
  orderSummery,
  cartItems,
  handlePlaceOrder,
  handleOrderSummeryInput,
  setConfirmationModalShow,
  confirmationModalShow,
}) => {
  return (
    <>
      <Button
        size={"sm"}
        variant={"success"}
        onClick={() => setModalShow(true)}
      >
        Add User
      </Button>

      <ListGroup className="mt-3">
        {customers.map((customer, index) => (
          <ListGroup.Item
            action
            variant={"primary"}
            key={index}
            onClick={() => selectCustomer(customer)}
          >
            {customer.name} - {customer.phone}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-3">
        <Button
          size={"lg"}
          className={"btn-block"}
          variant={"success"}
          onClick={() => setConfirmationModalShow(true)}
          disabled={
            orderSummery.items == 0 || orderSummery.customer == undefined
          }
        >
          Place Order
        </Button>
      </div>

      <OrderConfirmationModal
        show={confirmationModalShow}
        onHide={() => setConfirmationModalShow(false)}
        orderSummery={orderSummery}
        cartItems={cartItems}
        handlePlaceOrder={handlePlaceOrder}
        handleOrderSummeryInput={handleOrderSummeryInput}
      />
    </>
  );
};

export default UserArea;
