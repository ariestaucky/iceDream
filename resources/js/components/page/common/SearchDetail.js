import React, { Component } from "react";

class SearchDetail extends Component {
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
        let id = this.props.product.id.toString();
        cart[id] = cart[id] ? cart[id] : 0;
        let qty = cart[id] + parseInt(this.state.quantity);
        if (this.props.product.item_qty < qty) {
            cart[id] = this.props.product.item_qty;
        } else {
            cart[id] = qty;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.props.cart(Object.keys(cart).length);
    };

    render() {
        const { product } = this.props;
        return (
            <div className="product-cart">
                <div className="product-cart-image">
                    <img src={product.image} />
                </div>
                <div className="search-cart-details">
                    <div className="product-title">{product.name}</div>
                    <p className="product-cart-description">
                        {product.description}
                    </p>
                </div>
                <div className="product-cart-price search-price-part">
                    {product.price}
                </div>
                <div className="product-cart-quantity search-qty-part">
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
                </div>
                <div className="product-cart-removal">
                    <button
                        className="add-button btn btn-primary add-product-search"
                        onClick={this.addToCart.bind(this)}
                    >
                        <i className="fas fa-cart-plus"></i> &nbsp;Add
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchDetail;
