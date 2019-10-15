import React, { Component } from "react";
import SearchDetail from "./SearchDetail";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }
    render() {
        const { detail } = this.props.location.state;
        const { shooping_cart } = this.props.childProps.childProps;

        return (
            <div className="container my-4 mb-4">
                <h3 className="card-title">{detail.length} Search Result</h3>
                <div className="shopping-cart search-cart">
                    <div className="column-labels">
                        <label className="search-cart-image">Image</label>
                        <label className="search-cart-details">Product</label>
                        <label className="search-cart-price">Price</label>
                        <label className="search-cart-quantity">Quantity</label>
                        <label className="search-line-price">Action</label>
                    </div>

                    {detail.map((product, index) => (
                        <SearchDetail
                            cart={shooping_cart}
                            product={product}
                            remove={this.removeFromCart}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Search;
