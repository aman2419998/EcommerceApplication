import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  userDetailAction,
  userUpdateDetailAction,
} from "../actions/userActions";

import { getMyOrdersAction } from "../actions/orderActions";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetail);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateDetail);
  const { orders } = useSelector((state) => state.orderMyList);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length === 0) {
      history.push("/login");
    } else {
      if (!user || Object.keys(user).length === 0) {
        dispatch(userDetailAction());
        dispatch(getMyOrdersAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, userInfo, user]);

  const updateHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(userUpdateDetailAction({ name, email, password }));
    } else {
      setMessage("Password do not match");
    }
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Row>
          <Col md={4}>
            <h1>USER PROFILE</h1>
            {message && !success ? (
              <Message variant="danger" text={message}></Message>
            ) : (
              <></>
            )}
            {success ? (
              <Message variant="danger" text="Profile updated !"></Message>
            ) : (
              <></>
            )}
            {error ? <Message variant="danger" text={error}></Message> : <></>}
            <Form onSubmit={updateHandler}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter confirm password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                Update
              </Button>
            </Form>
          </Col>
          <Col md={8}>
            <h1>My Orders</h1>
            {orders && orders.length > 0 ? (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((e) => {
                      return (
                        <tr key={e._id}>
                          <td>{e._id}</td>
                          <td>{e.createdAt.split("T")[0]}</td>
                          <td>{e.totalPrice}</td>
                          <td>
                            {e.isPaid ? (
                              e.paidAt.split("T")[0]
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {e.isDelivered ? (
                              e.deliveredAt.split("T")[0]
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${e._id}`}>
                              <Button variant="light">Details</Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>{" "}
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileScreen;
