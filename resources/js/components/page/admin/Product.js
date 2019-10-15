import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "../../_config/Loading_3";

class Product extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            loading: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get("/api/product").then(response => {
            this.setState({
                products: response.data,
                loading: false
            });
        });
    }

    render() {
        const { products } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {this.state.loading ? (
                            <Loading />
                        ) : (
                            <div className="card">
                                <div className="card-header">All Product</div>
                                <div className="card-body">
                                    <Link
                                        className="btn btn-primary btn-sm mb-3"
                                        to="/addproduct"
                                    >
                                        Add Product
                                    </Link>
                                    <ul className="list-group list-group-flush">
                                        {products.map(product => (
                                            <Link
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                to={`/product/${product.id}`}
                                                key={product.id}
                                            >
                                                {product.product}
                                                <span className="badge badge-primary badge-pill">
                                                    {product.items_count}
                                                </span>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
