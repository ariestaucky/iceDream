import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../page/Home";
import Admin from "../page/admin/Admin";
import AddProduct from "../page/admin/addProduct";
import AddItem from "../page/admin/addItem";
import Product from "../page/admin/Product";
import ProductDetail from "../page/admin/ProductDetail";
import Menu from "../page/common/Menu";
import MenuDetail from "../page/common/MenuDetail";
import ItemDetail from "../page/admin/ItemDetail";
import EditProduct from "../page/admin/EditProduct";
import EditItem from "../page/admin/EditItem";
import Cart from "../page/common/Cart";
import About from "../page/common/About";
import Contact from "../page/common/Contact";
import Checkout from "../page/common/Checkout";
import Search from "../page/common/Search";

const Routes = childProps => {
    return (
        <Switch>
            <Public exact path="/" component={Home} />
            <Public exact path="/about" component={About} />
            <Public exact path="/contact" component={Contact} />
            <Restricted
                exact
                path="/login"
                childProps={childProps}
                component={Login}
            />
            <Restricted
                exact
                path="/register"
                childProps={childProps}
                component={Register}
            />
            <Protected
                exact
                path="/product"
                childProps={childProps}
                component={Product}
            />
            <Public exact path="/menu" component={Menu} />
            <Public path="/search" childProps={childProps} component={Search} />
            <Public
                exact
                path="/cart"
                childProps={childProps}
                component={Cart}
            />
            <Public
                exact
                path="/checkout"
                childProps={childProps}
                component={Checkout}
            />
            <Protected
                path="/admin"
                childProps={childProps}
                component={Admin}
            />
            <Protected
                exact
                path="/addproduct"
                childProps={childProps}
                component={AddProduct}
            />
            <Public
                exact
                path="/menu/:id"
                childProps={childProps}
                component={MenuDetail}
            />
            <Protected
                exact
                path="/product/:id"
                childProps={childProps}
                component={ProductDetail}
            />
            <Protected
                exact
                path="/edititem/:id"
                childProps={childProps}
                component={EditItem}
            />
            <Protected
                exact
                path="/editproduct/:id"
                childProps={childProps}
                component={EditProduct}
            />
            <Protected
                exact
                path="/product/:id/additem"
                childProps={childProps}
                component={AddItem}
            />
            <Protected
                exact
                path="/product/:id/item/:id"
                childProps={childProps}
                component={ItemDetail}
            />
        </Switch>
    );
};

const Protected = ({ component: Component, childProps, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                childProps.childProps.isLogged === true &&
                childProps.childProps.user.role == "admin" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/menu" />
                )
            }
        />
    );
};

const Public = ({ component: Component, childProps, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => <Component childProps={childProps} {...props} />}
        />
    );
};

const Restricted = ({ component: Component, childProps, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                childProps.childProps.isLogged === true ? (
                    <Redirect to="/menu" />
                ) : (
                    <Component childProps={childProps} {...props} />
                )
            }
        />
    );
};

export default Routes;
