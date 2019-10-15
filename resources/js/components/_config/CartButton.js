import React from "react";
import { Link, withRouter } from "react-router-dom";

const CartButton = props => {
    if (props.location.pathname == "/cart") return null;
    if (props.location.pathname == "/checkout") return null;
    if (props.location.pathname == "/about") return null;
    if (props.location.pathname == "/contact") return null;
    const { auth } = props;
    return (
        <Link className="button btn btn-primary sml" to="/cart">
            <span className="fas fa-shopping-cart" aria-hidden="true"></span>
            <span className="badge">{auth.cart}</span>
        </Link>
    );
};

export default withRouter(CartButton);
