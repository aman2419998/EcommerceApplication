import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createReviewAction, detailProduct } from "../actions/productActions";
import { Button, Image, Row, Col, ListGroup, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";
import Meta from "../components/Meta";

const Productscreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success,
  } = productCreateReview;

  useEffect(() => {
    dispatch(detailProduct(match.params.id));
  }, [dispatch, match, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = () => {
    dispatch(createReviewAction(match.params.id, { rating, comment }));
    setRating(0);
    setComment("");
  };

  return (
    <>
      <LinkContainer to="/" className="my-2">
        <Button variant="dark">Go Back</Button>
      </LinkContainer>
      {loading || loadingReview ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <div>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ width: "550px", height: "450px" }}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price Rs. <strong> {product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>Rs. {product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Col className="">
                      <Button
                        variant="primary"
                        onClick={addToCartHandler}
                        size="md"
                        block
                        disabled={product.countInStock === 0 ? true : false}
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <h2>Reviews</h2>
              <ListGroup variant="flush">
                {product && product.reviews.length === 0 ? (
                  <ListGroup.Item>
                    <Message text="No Reviews"></Message>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <ListGroup variant="flush">
                      {product &&
                        product.reviews.map((review) => {
                          return (
                            <ListGroup.Item key={review._id}>
                              <strong>{review.name}</strong>
                              <p>
                                <Rating value={review.rating}></Rating>
                              </p>
                              <p>{review.createdAt.split("T")[0]}</p>
                              <p> {review.comment} </p>
                            </ListGroup.Item>
                          );
                        })}
                    </ListGroup>
                  </ListGroup.Item>
                )}

                {userInfo && Object.keys(userInfo).length !== 0 ? (
                  <>
                    <ListGroup.Item>
                      <h2>Write a customer review</h2>
                      {errorReview ? (
                        <Message variant="danger" text={errorReview}></Message>
                      ) : (
                        <></>
                      )}
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            required
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            value={comment}
                            required
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  </>
                ) : (
                  <></>
                )}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Productscreen;
