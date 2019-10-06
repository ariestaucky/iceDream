import React from "react";

const CartItem = props => {
    return (
        <div className="product-cart">
            <div className="product-cart-image">
                <img src={props.product.image} />
            </div>
            <div className="product-cart-details">
                <div className="product-title">{props.product.name}</div>
                <p className="product-cart-description">
                    {props.product.description}
                </p>
            </div>
            <div className="product-cart-price">{props.product.price}</div>
            <div className="product-cart-quantity">{props.product.qty}</div>
            <div className="product-cart-removal">
                <button
                    className="btn remove-product"
                    onClick={() => props.remove(props.product)}
                >
                    <i className="fas fa-trash-alt"></i> &nbsp;Remove
                </button>
            </div>
            <div className="product-line-price">{props.product.subtotal}</div>
        </div>
    );
};

export default CartItem;
