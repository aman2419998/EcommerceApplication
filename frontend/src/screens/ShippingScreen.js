import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { saveShippingAddressAction } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(
    shippingAddress && shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress != null && shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress && shippingAddress.postalCode
      ? shippingAddress.postalCode
      : ""
  );
  const [country, setCountry] = useState(
    shippingAddress && shippingAddress.country ? shippingAddress.country : ""
  );

  const saveAddressHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddressAction({ address, city, postalCode, country }));
    history.push("/payment");
  };

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length === 0) {
      history.push("/login");
    }
  });

  return (
    <>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <CheckoutSteps step1 step2></CheckoutSteps>
          <h1 className="mt-3">Shipping</h1>
          <Form onSubmit={saveAddressHandler}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              continue
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ShippingScreen;
