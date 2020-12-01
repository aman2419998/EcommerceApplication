import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { userRegisterAction } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const registerHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(userRegisterAction(name, email, password));
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
          <Col md={3}></Col>
          <Col md={6}>
            <h1>Sign Up</h1>
            {message ? (
              <Message variant="danger" text={message}></Message>
            ) : (
              <></>
            )}
            {error ? <Message variant="danger" text={error}></Message> : <></>}
            <Form onSubmit={registerHandler}>
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
                  autoComplete={0}
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

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter confirm password"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                Register
              </Button>

              <Form.Group>
                <Form.Label>
                  Have an account ?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Login
                  </Link>
                </Form.Label>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default RegisterScreen;
