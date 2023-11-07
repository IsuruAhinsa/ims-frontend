import React from "react";
import { Button, ButtonGroup, Stack } from "react-bootstrap";

const CartItemsArea = ({ cartItems, removeFromCart, setCartItems }) => {
  const increaseQuantity = (id) => {
    if (cartItems[id].stock > cartItems[id].quantity) {
      setCartItems((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: cartItems[id].quantity + 1,
        },
      }));
    }
  };

  const decreaseQuantity = (id) => {
    if (cartItems[id].quantity > 1) {
      setCartItems((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: cartItems[id].quantity - 1,
        },
      }));
    }
  };
  return (
    <Stack gap={3}>
      {Object.keys(cartItems).map((key) => (
        <div key={key} className="d-flex p-1 align-items-start">
          <img
            src={cartItems[key].photo}
            className="w-25"
            alt={cartItems[key].photo}
          />
          <div className="flex-grow-1 ml-3 small">
            <div className="font-weight-bold">{cartItems[key].name}</div>
            <div>Original Price: {cartItems[key].price}</div>
            <div>
              Sell Price: {cartItems[key].sale_price.symbol}{" "}
              {cartItems[key].sale_price.price}
            </div>
            {cartItems[key].sale_price.discount != 0.0 && (
              <div>
                Discount: {cartItems[key].sale_price.symbol}{" "}
                {cartItems[key].sale_price.discount}
              </div>
            )}
            <div>SKU: {cartItems[key].sku}</div>
            <div>Stock: {cartItems[key].stock}</div>

            {/*Quantity Changer*/}
            <div>
              <span className="mr-3">{cartItems[key].quantity}</span>
              <ButtonGroup size={"sm"}>
                <Button
                  variant={"success"}
                  onClick={() => increaseQuantity(cartItems[key].id)}
                  disabled={cartItems[key].stock <= cartItems[key].quantity}
                >
                  <i className="fas fa-plus" />
                </Button>
                <Button
                  variant={"danger"}
                  onClick={() => decreaseQuantity(cartItems[key].id)}
                  disabled={cartItems[key].quantity <= 1}
                >
                  <i className="fas fa-minus" />
                </Button>
              </ButtonGroup>
            </div>

            <div className="mt-1">
              <ButtonGroup size={"sm"}>
                <Button variant={"primary"}>
                  <i className="fas fa-eye" />
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => removeFromCart(key)}
                >
                  <i className="fas fa-times-circle" />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default CartItemsArea;
