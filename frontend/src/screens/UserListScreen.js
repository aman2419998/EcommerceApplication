import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAction,
  userDeleteAction,
  userListAction,
} from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(userListAction());
    }
  }, [dispatch, userInfo, history, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(userDeleteAction(id));
      if (id === userInfo._id) {
        dispatch(logoutAction());
        history.push("/");
      }
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
          <h1>Users</h1>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td> {e._id} </td>
                      <td> {e.name} </td>
                      <td> {e.email} </td>
                      <td>
                        {e.isAdmin ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/admin/user/${e._id}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          onClick={() => deleteHandler(e._id)}
                          className="btn-sm ml-1"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default UserListScreen;
