import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { detailProduct, updateProductAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: LoadingProduct,
    error: errorProduct,
    success,
  } = productUpdate;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (success) {
      dispatch(detailProduct(match.params.id));
      history.push("/admin/productlist");
    } else {
      if (product && match.params.id === product._id) {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      } else {
        if (userInfo && userInfo.isAdmin) {
          dispatch(detailProduct(match.params.id));
        } else {
          history.push("/");
        }
      }
    }
  }, [dispatch, match, history, userInfo, product, success]);

  const submitHandler = () => {
    dispatch(
      updateProductAction(match.params.id, {
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image,
      })
    );
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading || LoadingProduct || uploading ? (
        <Loader></Loader>
      ) : error || errorProduct ? (
        <Message variant="danger" text={error}></Message>
      ) : (
        <>
          <LinkContainer to="/admin/productlist">
            <Button>Go Back</Button>
          </LinkContainer>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <h1>Edit Product</h1>
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="Number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Price"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter Image URL"
                  />
                  <Form.Group>
                    <Form.File
                      id="exampleFormControlFile1"
                      label="Choose a file in jpg/jpeg/png"
                      onChange={uploadHandler}
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Enter Brand"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type="Number"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    placeholder="Enter Count In Stock"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter Category"
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </Form.Group>

                <Button variant="primary" onClick={submitHandler}>
                  UPDATE
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductEditScreen;
