import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAction,
  deleteProductAction,
  listProducts,
} from "../actions/productActions";
import Paginate from "../components/Paginate";
const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: productDeleteLoading, success } = productDelete;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: productCreateLoading,
    success: SuccessCreate,
    error: productCreateError,
    product,
  } = productCreate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts("", pageNumber));
    } else {
      history.push("/login");
    }

    if (SuccessCreate) {
      history.push(`/admin/product/${product._id}/edit`);
    }
  }, [
    history,
    userInfo,
    dispatch,
    success,
    SuccessCreate,
    product,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAction(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProductAction());
  };

  return (
    <>
      {loading || productDeleteLoading || productCreateLoading ? (
        <Loader></Loader>
      ) : error || productCreateError ? (
        <Message variant="danger" text={error || productCreateError}></Message>
      ) : (
        <>
          <Row>
            <Col>
              {" "}
              <h1>Products</h1>
            </Col>
            <Col className="text-right">
              <Button onClick={createProductHandler}>
                <i className="fas fa-plus"></i> Create Product{" "}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover className="mt-3 table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((e) => {
                      return (
                        <tr key={e._id}>
                          <td> {e._id} </td>
                          <td> {e.name} </td>
                          <td> {e.price} </td>
                          <td> {e.category} </td>
                          <td> {e.brand} </td>
                          <td style={{ width: "130px" }}>
                            <Row>
                              <Col xs={6}>
                                <LinkContainer
                                  to={`/admin/product/${e._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm ">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                              </Col>
                              <Col xs={6}>
                                <Button
                                  variant="danger"
                                  onClick={() => deleteHandler(e._id)}
                                  className="btn-sm "
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Paginate page={page} pages={pages} isAdmin={true}>
              {" "}
            </Paginate>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
