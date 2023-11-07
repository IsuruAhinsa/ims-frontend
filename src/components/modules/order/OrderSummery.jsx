import React from "react";

const OrderSummery = ({ orderSummery }) => {
  return (
    <table className="table table-borderless table-sm">
      <tr>
        <td className="font-weight-bold">Total Items</td>
        <td>{orderSummery.items}</td>
      </tr>
      <tr>
        <td className="font-weight-bold">Price</td>
        <td>
          {new Intl.NumberFormat("us", {
            style: "currency",
            currency: "LKR",
          }).format(orderSummery.amount)}
        </td>
      </tr>
      <tr>
        <td className="font-weight-bold">- Discount</td>
        <td>
          {new Intl.NumberFormat("us", {
            style: "currency",
            currency: "LKR",
          }).format(orderSummery.discount)}
        </td>
      </tr>
      <tr className="bg-danger text-white">
        <td className="font-weight-bold">Net Payable</td>
        <td className="font-weight-bold">
          {new Intl.NumberFormat("us", {
            style: "currency",
            currency: "LKR",
          }).format(orderSummery.payable)}
        </td>
      </tr>
    </table>
  );
};

export default OrderSummery;
