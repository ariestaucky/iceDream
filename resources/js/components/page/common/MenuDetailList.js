import React, { Component, Fragment } from "react";

class MenuDetailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };
    }

    handleInputChange = event =>
        this.setState({ [event.target.name]: event.target.value });

    addToCart = () => {
        let cart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : {};
        let id = this.props.menu.id.toString();
        cart[id] = cart[id] ? cart[id] : 0;
        let qty = cart[id] + parseInt(this.state.quantity);
        if (this.props.menu.item_qty < qty) {
            cart[id] = this.props.menu.item_qty;
        } else {
            cart[id] = qty;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.props.cart(Object.keys(cart).length);
    };

    render() {
        const { menu, shooping_cart } = this.props;

        return (
            <Fragment>
                <div className="col-md-6">
                    <div className="single_menu_list">
                        <img src={menu.image} />
                        <div className="menu_content">
                            <h4>
                                {menu.name} <span>${menu.price}</span>
                            </h4>
                            <p>{menu.description}</p>
                            {menu.item_qty > 0 ? (
                                <div>
                                    <input
                                        type="number"
                                        value={this.state.quantity}
                                        name="quantity"
                                        onChange={this.handleInputChange}
                                        className="float-left"
                                        style={{
                                            width: "60px",
                                            marginRight: "10px",
                                            borderRadius: "3px"
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.addToCart.bind(
                                            shooping_cart
                                        )}
                                    >
                                        <i className="fas fa-cart-plus"></i>
                                        &nbsp;Add
                                    </button>
                                </div>
                            ) : (
                                <p className="text-danger">
                                    {" "}
                                    product is out of stock{" "}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MenuDetailList;
