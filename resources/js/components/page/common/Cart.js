import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Axios from "axios";

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            total: 0,
            tax: 0
        };
    }

    componentDidMount() {
        let cart = localStorage.getItem("cart");
        if (!cart) return;
        let id = null;
        let product = [];
        let total = 0;
        let cart_shop = JSON.parse(cart);
        Axios.get("/api/item")
            .then(response => {
                for (var i = 0; i < response.data.length; i++) {
                    id = response.data[i].id.toString();

                    if (cart_shop != null && cart_shop.hasOwnProperty(id)) {
                        response.data[i].qty = cart_shop[id];
                        response.data[i].subtotal =
                            cart_shop[id] * response.data[i].price;
                        product.push(response.data[i]);
                    }
                }
                return product;
            })
            .then(product => {
                for (var i = 0; i < product.length; i++) {
                    total += product[i].price * product[i].qty;
                }

                this.setState({
                    products: product,
                    total: total,
                    tax: total * 0.05
                });
            });
    }

    removeFromCart = product => {
        let products = this.state.products.filter(
            item => item.id !== product.id
        );

        let cart = JSON.parse(localStorage.getItem("cart"));
        delete cart[product.id.toString()];
        localStorage.setItem("cart", JSON.stringify(cart));
        let total = this.state.total - product.qty * product.price;
        this.setState({
            products: products,
            total: total,
            tax: total * 0.05
        });
        this.props.childProps.childProps.shooping_cart(
            Object.keys(products).length
        );
    };

    clearCart = () => {
        localStorage.removeItem("cart");
        this.setState({ products: [] });
        this.props.childProps.childProps.shooping_cart(0);
    };

    checkout = () => {
        this.clearCart();
        this.props.history.push("/checkout");
    };

    render() {
        const { products, total, tax } = this.state;

        return (
            <div className="container my-4 mb-4">
                <h3 className="card-title">Cart</h3>
                {!products.length ? (
                    <h3 className="text-dark full-height">
                        No item on the cart
                    </h3>
                ) : (
                    <div className="shopping-cart">
                        <div className="column-labels">
                            <label className="product-cart-image">Image</label>
                            <label className="product-cart-details">
                                Product
                            </label>
                            <label className="product-cart-price">Price</label>
                            <label className="product-cart-quantity">
                                Quantity
                            </label>
                            <label className="product-cart-removal">
                                Remove
                            </label>
                            <label className="product-line-price">Total</label>
                        </div>

                        {products.map((product, index) => (
                            <CartItem
                                product={product}
                                remove={this.removeFromCart}
                                key={index}
                            />
                        ))}

                        <div className="totals">
                            <div className="totals-item">
                                <label>Subtotal</label>
                                <div
                                    className="totals-value"
                                    id="cart-subtotal"
                                >
                                    {total}
                                </div>
                            </div>

                            <div className="totals-item">
                                <label>Tax (5%)</label>
                                <div className="totals-value" id="cart-tax">
                                    {tax}
                                </div>
                            </div>

                            <div className="totals-item totals-item-total">
                                <label>Grand Total</label>
                                <div className="totals-value" id="cart-total">
                                    {total + tax}
                                </div>
                            </div>
                        </div>

                        <button
                            className="checkout ml-2"
                            onClick={this.checkout}
                        >
                            Checkout
                        </button>
                        <button
                            className="clearcart btn-danger"
                            onClick={this.clearCart}
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
