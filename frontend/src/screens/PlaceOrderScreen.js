import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { orderCreateAction } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice && cart.itemsPrice < 600 ? 50 : 0;

  cart.tax = cart.itemsPrice ? 40 : 0;

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.tax;

  const orderHandler = () => {
    dispatch(
      orderCreateAction({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        taxPrice: cart.tax,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length === 0) {
      history.push("/login");
    }

    if (shippingAddress === null || Object.keys(shippingAddress).length === 0) {
      history.push("/shipping");
    }

    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, userInfo, shippingAddress, success, order]);

  return (
    <>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>
                {shippingAddress.address},{shippingAddress.city},
                {shippingAddress.postalCode},{shippingAddress.country}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method : {paymentMethod}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <>
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              style={{ width: "60px", height: "30px" }}
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>
                          <Col md={7}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = Rs.{" "}
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>order summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={6}>Items</Col>
                <Col sm={6}>Rs. {cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={6}>Shipping</Col>
                <Col sm={6}>Rs. {cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={6}>Tax</Col>
                <Col sm={6}>Rs. {cart.tax} </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={6}>
                  <strong>Total</strong>
                </Col>
                <Col sm={6}>
                  <strong>Rs. {cart.totalPrice}</strong>{" "}
                </Col>
              </Row>
            </ListGroup.Item>

            {error ? (
              <>
                <ListGroup.Item>
                  <Message variant="danger" text={error}></Message>
                </ListGroup.Item>
              </>
            ) : (
              <></>
            )}

            <ListGroup.Item>
              <Button
                variant="primary"
                size="md"
                block
                onClick={orderHandler}
                disabled={cart.cartItems.length === 0}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
