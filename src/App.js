import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import HomeScreen from "./components/HomeScreen/homeScreen";
import SingleProduct from "./components/singleProduct/singleProduct";
import CartScreen from "./components/cartScreen/cartScreen";
import LoginScreen from "./components/loginScreen/loginScreen";
import RegisterScreen from "./components/registerScreen/registerScreen";
import ProfileScreen from "./components/profileScreen/profileScreen";
import ShippingScreen from "./components/shippingScreen/shippingScreen";
import PaymentScreen from "./components/paymentScreen/paymentScreen";
import PlaceOrderScreen from "./components/placeOrderScreen/placeOrderScreen";
import OrderScreen from "./components/orderScreen.js/orderScreen";
import UserListScreen from "./components/userListScreen/userListScreen";
import UserEditScreen from "./components/userEditScreen/userEditScreen";
import ProductListScreen from "./components/productListScreen/productListScreen";
import ProductEditScreen from "./components/productEditScreen/productEditScreen";
import OrderListScreen from "./components/orderListScreen/orderListScreen";
import ProductCreateScreen from "./components/productCreateScreen.js/productCreateScreen";

function App() {
	return (
		<div>
			<Router>
				<Header />

				<Switch>
					<Route exact path="/">
						<HomeScreen />
					</Route>
					<Route path="/product/:id">
						<SingleProduct />
					</Route>
					<Route exact path="/cart/:id?">
						<CartScreen />
					</Route>
					<Route exact path="/login">
						<LoginScreen />
					</Route>
					<Route path="/register">
						<RegisterScreen />
					</Route>
					<Route path="/profile">
						<ProfileScreen />
					</Route>
					<Route path="/shipping">
						<ShippingScreen />
					</Route>
					<Route path="/payment">
						<PaymentScreen />
					</Route>
					<Route path="/placeorder">
						<PlaceOrderScreen />
					</Route>
					<Route path="/order/:id">
						<OrderScreen />
					</Route>
					<Route path="/admin/userlist">
						<UserListScreen />
					</Route>
					<Route path="/admin/user/:id/edit">
						<UserEditScreen />
					</Route>
					<Route path="/admin/productlist">
						<ProductListScreen />
					</Route>
					<Route path="/admin/product/:id/edit">
						<ProductEditScreen />
					</Route>
					<Route path="/admin/orderlist">
						<OrderListScreen />
					</Route>
					<Route path="/search/:keyword">
						<HomeScreen />
					</Route>
                    <Route path="/admin/create/product">
                        <ProductCreateScreen/>
                    </Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
