import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  userDetailByAdminAction,
  userListAction,
  userUpdateByAdminAction,
} from "../actions/userActions";
import { USER_DETAIL_ADMIN_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetailByAdmin = useSelector((state) => state.userDetailByAdmin);
  const { loading, error, userDetail } = userDetailByAdmin;

  const userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin);
  const { success } = userUpdateByAdmin;

  useEffect(() => {
    if (!userDetail || match.params.id !== userDetail._id) {
      dispatch(userDetailByAdminAction(match.params.id));
    } else {
      setName(userDetail.name);
      setEmail(userDetail.email);
      setisAdmin(userDetail.isAdmin);
    }
  }, [dispatch, userDetail, match, history, success]);

  const submitHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(userUpdateByAdminAction(userDetail._id, name, email, isAdmin));
      dispatch({ type: USER_DETAIL_ADMIN_RESET });
      dispatch(userListAction());
      history.push("/admin/userlist");
    }
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger" text={error}></Message>
      ) : (
        <>
          {" "}
          <LinkContainer to={"/admin/userlist"}>
            <Button>Go Back</Button>
          </LinkContainer>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              {" "}
              <>
                <h2>Edit Users</h2>
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => setisAdmin(e.target.checked)}
                      label="Is Admin"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    update
                  </Button>
                </Form>{" "}
              </>{" "}
            </Col>
          </Row>{" "}
        </>
      )}
    </>
  );
};

export default UserEditScreen;
