import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Card from "../../partials/common/card/Card.jsx";
import { Loading, Notify } from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import AddCustomerModal from "../customer/AddCustomerModal.jsx";
import ProductListArea from "./ProductListArea.jsx";
import OrderSummery from "./OrderSummery.jsx";
import CartItemsArea from "./CartItemsArea.jsx";
import UserArea from "./UserArea.jsx";
import SearchArea from "./SearchArea.jsx";

const AddOrder = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [orderSummery, setOrderSummery] = useState({
    items: 0,
    amount: 0,
    discount: 0,
    payable: 0,
    paid_amount: 0,
    due_amount: 0,
    payment_method_id: 1,
    trx_id: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [customers, setCustomers] = useState([]);

  // search status
  const [input, setInput] = useState({
    order_by: "created_at",
    per_page: 5,
    direction: "asc",
    search: "",
  });
  const [customerSearchInput, setCustomerSearchInput] = useState("");

  const [order, setOrder] = useState({});

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomerSearchInput = (e) => {
    setCustomerSearchInput(e.target.value);
  };

  const getProducts = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/products?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setProducts(res.data.data);
        Loading.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCart = (productId) => {
    products.map((product) => {
      if (product.id === productId) {
        if (cartItems[productId] == undefined) {
          setCartItems((prevState) => ({ ...prevState, [productId]: product }));
          // added quantity for product cart items
          setCartItems((prevState) => ({
            ...prevState,
            [productId]: {
              ...prevState[productId],
              quantity: 1,
            },
          }));
        } else {
          if (cartItems[productId].stock > cartItems[productId].quantity) {
            setCartItems((prevState) => ({
              ...prevState,
              [productId]: {
                ...prevState[productId],
                quantity: cartItems[productId].quantity + 1,
              },
            }));
          }
        }
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
  };

  const getCustomers = () => {
    Loading.standard();
    axios
      .get(`${Constants.BASE_URL}/customers?search=${customerSearchInput}`)
      .then((res) => {
        setCustomers(res.data);
        Loading.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectCustomer = (customer) => {
    setOrder((prevState) => ({
      ...prevState,
      customer_id: customer.id,
    }));

    setOrderSummery((prevState) => ({
      ...prevState,
      customer: customer.name + " - " + customer.phone,
      customer_id: customer.id,
    }));
  };

  const calculateOrderSummery = () => {
    let items = 0;
    let amount = 0;
    let discount = 0;
    let payable = 0;
    let symbol = "";

    Object.keys(cartItems).map((key) => {
      amount += cartItems[key].original_price * cartItems[key].quantity;
      discount += cartItems[key].sale_price.discount * cartItems[key].quantity;
      payable += cartItems[key].sale_price.price * cartItems[key].quantity;
      symbol = cartItems[key].sale_price.symbol;
      items += cartItems[key].quantity;
    });

    setOrderSummery((prevState) => ({
      ...prevState,
      items: items,
      amount: amount,
      discount: discount,
      payable: payable,
      symbol: symbol,
      paid_amount: payable,
    }));
  };

  const handlePlaceOrder = () => {
    Loading.standard();
    axios
      .post(`${Constants.BASE_URL}/orders`, {
        carts: cartItems,
        order_summery: orderSummery,
      })
      .then((res) => {
        Loading.remove();
        setConfirmationModalShow(false);
        if (res.data.flag === true) {
          Notify.success("Order Placed Successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    Loading.remove();
  };

  const handleOrderSummeryInput = (e) => {
    if (e.target.name === "paid_amount") {
      if (orderSummery.payable >= e.target.value) {
        setOrderSummery((prevState) => ({
          ...prevState,
          paid_amount: e.target.value,
          due_amount: orderSummery.payable - e.target.value,
        }));
      }
    }

    if (e.target.name === "payment_method_id") {
      setOrderSummery((prevState) => ({
        ...prevState,
        payment_method_id: e.target.value,
      }));

      if (e.target.value === 1) {
        setOrderSummery((prevState) => ({
          ...prevState,
          trx_id: "",
        }));
      }
    }

    if (e.target.name === "trx_id") {
      setOrderSummery((prevState) => ({
        ...prevState,
        trx_id: e.target.value,
      }));
    }
  };

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  useEffect(() => {
    calculateOrderSummery();
  }, [cartItems]);

  // for realtime search
  useEffect(() => {
    getCustomers();
  }, [customerSearchInput]);

  return (
    <>
      <Breadcrumb title={"Create Order"} />
      <Container fluid>
        <Card title={"Create Order"} to={"/order"} btnText={"Order List"}>
          <Row>
            <Col md={4}>
              <Card title={"Products"}>
                {/*Search Area*/}
                <SearchArea
                  placeholder="Search Products..."
                  onChange={handleInput}
                  value={input.search}
                  onClick={getProducts}
                />
                {/*Product List Area*/}
                <ProductListArea products={products} handleCart={handleCart} />
              </Card>
            </Col>

            <Col md={4}>
              <Card title={"Cart"}>
                {orderSummery.customer && (
                  <Alert variant={"warning"}>
                    <strong>Customer</strong> <br /> {orderSummery.customer}
                  </Alert>
                )}
                {/*Order Summery*/}
                <OrderSummery orderSummery={orderSummery} />
                {/*Cart Items Area*/}
                <CartItemsArea
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  setCartItems={setCartItems}
                />
              </Card>
            </Col>

            <Col md={4}>
              <Card title={"Users"}>
                <SearchArea
                  placeholder="Search User..."
                  onChange={handleCustomerSearchInput}
                  onClick={getCustomers}
                  value={customerSearchInput}
                />
                <UserArea
                  setModalShow={setModalShow}
                  customers={customers}
                  selectCustomer={selectCustomer}
                  orderSummery={orderSummery}
                  cartItems={cartItems}
                  handlePlaceOrder={handlePlaceOrder}
                  setConfirmationModalShow={setConfirmationModalShow}
                  confirmationModalShow={confirmationModalShow}
                  handleOrderSummeryInput={handleOrderSummeryInput}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>

      <AddCustomerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        getCustomers={getCustomers}
      />
    </>
  );
};

export default AddOrder;
