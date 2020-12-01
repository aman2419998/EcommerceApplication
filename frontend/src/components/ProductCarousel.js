import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTopProductAction } from "../actions/productActions";
const ProductCarousel = () => {
  const dispatch = useDispatch();

  const topProducts = useSelector((state) => state.topProducts);
  const { products } = topProducts;

  useEffect(() => {
    dispatch(getTopProductAction());
  }, [dispatch]);

  return products && products.length > 0 ? (
    <>
      <Carousel pause="hover" className="bg-dark">
        {products &&
          products.map((product) => {
            return (
              <Carousel.Item style={{ height: "400px" }} key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Carousel.Caption
                    style={{
                      position: "absolute",
                      top: 0,
                    }}
                  >
                    <h3 style={{ color: "white" }}>
                      {product.name} -- Rs.{product.price}
                    </h3>
                  </Carousel.Caption>
                  <Image
                    className="mt-5"
                    fluid
                    style={{
                      borderRadius: "50%",
                      height: "300px",
                      width: "300px",
                      padding: "30px",
                    }}
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </>
  ) : (
    <></>
  );
};

export default ProductCarousel;
