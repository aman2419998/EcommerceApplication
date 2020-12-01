import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ProShop</Navbar.Brand>

          <Route
            render={({ history }) => <SearchBox history={history} />}
          ></Route>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa fa-shopping-cart"> Cart</i>
                </Nav.Link>
              </LinkContainer>
              {userInfo && Object.keys(userInfo).length > 0 ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item> Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/">
                    <NavDropdown.Item href="/" onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"> Sign in</i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin ? (
                <>
                  {" "}
                  <NavDropdown title="ADMIN" id="basic-nav-dropdown">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
