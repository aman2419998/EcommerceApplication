import React, { useEffect } from "react";
import Product from "../components/Product";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Row, Button } from "react-bootstrap";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { LinkContainer } from "react-router-bootstrap";

const Homescreen = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error}></Message>
      ) : (
        <>
          {!keyword ? (
            <div style={{ height: "400px" }}>
              <ProductCarousel />
            </div>
          ) : (
            <>
              <LinkContainer to="/">
                <Button>Go Back</Button>
              </LinkContainer>
            </>
          )}
          <h1 className="mt-2">Latest Products</h1>{" "}
          <>
            {" "}
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product products={product} />
                </Col>
              ))}
            </Row>{" "}
            <Row className="mx-auto">
              <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ""}
              />
            </Row>
          </>{" "}
        </>
      )}
    </>
  );
};

export default Homescreen;
