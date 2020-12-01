import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getOrdersAction } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrdersAction());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger" text={error}></Message>
      ) : (
        <>
          <h1>ORDERS</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user}</td>
                      <td>{order.createdAt.split("T")[0]}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.split("T")[0]
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.split("T")[0]
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light">Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
