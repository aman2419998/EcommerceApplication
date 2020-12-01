import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ products }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded" style={{ height: "450px" }}>
        <Link to={`/product/${products._id}`}>
          <Card.Img
            variant="top"
            src={products.image}
            style={{ width: "220px", height: "190px" }}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${products._id}`}>
            <Card.Title>{products.name}</Card.Title>
          </Link>
          <Card.Text>
            <Rating
              value={products.rating}
              text={`${products.numReviews} reviews`}
            />
          </Card.Text>
          <h3> Rs. {products.price} </h3>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
