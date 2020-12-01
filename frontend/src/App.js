import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homescreen from "../src/screens/Homescreen";
import Productscreen from "../src/screens/Productscreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Route path="/" component={Homescreen} exact />
          <Route path="/product/:id" component={Productscreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id" component={UserEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/search/:keyword" component={Homescreen} exact />
          <Route path="/page/:pageNumber" component={Homescreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={Homescreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
