import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Row, Col, Image, Button } from "react-bootstrap";
import {
  getMyOrdersAction,
  orderDetailAction,
  payOrder,
  updateOrderToDeliveredAction,
} from "../actions/orderActions";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const id = match.params.id;

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const itemPrice = () => {
    return orderDetail.orderItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, orderDetail, user } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: LoadingPay, success } = orderPay;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const {
    loading: LoadingDelivered,
    success: successDelivered,
  } = orderDelivered;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (orderDetail && id !== orderDetail._id) {
      dispatch(orderDetailAction(id));
    }

    if (!orderDetail || success) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(orderDetailAction(id));
      dispatch(getMyOrdersAction());
    } else {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, success, sdkReady, orderDetail, successDelivered]);

  const sucessHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(updateOrderToDeliveredAction(id));
    dispatch(orderDetailAction(id));
  };

  return (
    <>
      {loading || LoadingDelivered ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger" text={error}></Message>
      ) : orderDetail ? (
        <>
          <h1>order {orderDetail._id}</h1>
          <Row className="mt-3">
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name : {user.name}</strong>
                  </p>
                  <p>
                    {" "}
                    <strong>
                      Email : <a href={`mailto:${user.email}`}>{user.email}</a>
                    </strong>
                  </p>
                  <p>
                    <strong>
                      Address :{orderDetail.shippingAddress.address},
                      {orderDetail.shippingAddress.city},
                      {orderDetail.shippingAddress.postalCode},
                      {orderDetail.shippingAddress.country}
                    </strong>
                  </p>
                  {orderDetail.isDelivered ? (
                    <Message variant="success" text="Delivered"></Message>
                  ) : (
                    <Message variant="danger" text="Not Delivered"></Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method : {orderDetail.paymentMethod}</strong>
                  </p>
                  {orderDetail.isPaid ? (
                    <Message
                      variant="success"
                      text={`Paid on ${orderDetail.paidAt}`}
                    ></Message>
                  ) : (
                    <Message variant="danger" text="Not Paid"></Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <>
                    <ListGroup variant="flush">
                      {orderDetail.orderItems.map((item, index) => {
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
                    <Col sm={6}>Rs. {itemPrice()}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col sm={6}>Shipping</Col>
                    <Col sm={6}>Rs. {orderDetail.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col sm={6}>Tax</Col>
                    <Col sm={6}>Rs. {orderDetail.taxPrice} </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col sm={6}>
                      <strong>Total</strong>
                    </Col>
                    <Col sm={6}>
                      <strong>Rs. {orderDetail.totalPrice}</strong>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!orderDetail.isPaid && (
                  <ListGroup.Item>
                    {LoadingPay ? (
                      <Loader></Loader>
                    ) : (
                      <>
                        {sdkReady ? (
                          <PayPalButton
                            amount={orderDetail.totalPrice}
                            onSuccess={sucessHandler}
                          ></PayPalButton>
                        ) : (
                          <Loader></Loader>
                        )}
                      </>
                    )}
                  </ListGroup.Item>
                )}
                {!orderDetail.isDelivered && userInfo.isAdmin ? (
                  <ListGroup.Item>
                    <Button block onClick={deliverHandler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                ) : (
                  <></>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderScreen;
