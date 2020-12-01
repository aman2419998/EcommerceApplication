import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <Form inline onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Search Products..."
              value={keyword}
              autoComplete="off"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              variant="outline-success"
              type="submit"
              size="sm"
              className="ml-2"
            >
              Search
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </>
  );
};

export default SearchBox;
