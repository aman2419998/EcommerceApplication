import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginAction } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(LoginAction(email, password));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <h1>SIGN IN</h1>
              {error ? (
                <Message variant="danger" text={error}></Message>
              ) : (
                <> </>
              )}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    autoComplete={0}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-3">
                  Sign in
                </Button>

                <Form.Group>
                  <Form.Label>
                    New Customer ?{" "}
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : "/register"
                      }
                    >
                      Register
                    </Link>
                  </Form.Label>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default LoginScreen;
