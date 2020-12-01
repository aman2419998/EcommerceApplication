import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethodAction } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length === 0) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const paymentHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethodAction(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <h1 className="mt-3">PAYMENT METHOD</h1>
          <Form onSubmit={paymentHandler}>
            <Form.Group>
              <Form.Label>Select Method</Form.Label>

              <Col>
                <Form.Check
                  type="radio"
                  value="PayPal"
                  checked
                  label="Paypal or Credit Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PaymentScreen;
