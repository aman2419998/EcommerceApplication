import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Button, ListGroup, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { additemAction, removeItemAction } from "../actions/cartActions";
import { Link } from "react-router-dom";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(additemAction(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeItemHandler = (id) => {
    dispatch(removeItemAction(id));
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length <= 0 ? (
            <>
              <LinkContainer to="/" className="my-2">
                <Button>Go Back</Button>
              </LinkContainer>
              <Message text={`Your cart is empty`}></Message>
            </>
          ) : (
            <>
              <ListGroup variant="flush">
                {cartItems.map((cartItem) => {
                  return (
                    <ListGroup.Item key={cartItem.product} className="p-2">
                      <Row>
                        <Col md={2}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            style={{ width: "80px", height: "60px" }}
                            fluid
                          />
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${cartItem.product}`}>
                            {cartItem.name}
                          </Link>
                        </Col>
                        <Col md={2}>Rs. {cartItem.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={cartItem.qty}
                            onChange={(e) =>
                              dispatch(
                                additemAction(
                                  cartItem.product,
                                  Number(e.target.value)
                                )
                              )
                            }
                          >
                            {[...Array(cartItem.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="light"
                            onClick={() => removeItemHandler(cartItem.product)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                ITEMS
              </h3>
              Rs.{" "}
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <LinkContainer to="/login?redirect=shipping">
              <ListGroup.Item>
                <Button block disabled={cartItems.length > 0 ? false : true}>
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </LinkContainer>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
