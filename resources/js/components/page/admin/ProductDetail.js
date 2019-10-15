import axios from "axios";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Loading from "../../_config/Loading_3";

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            items: [],
            errors: [],
            loading: false
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });

        const productId = this.props.match.params.id;

        axios.get(`/api/product/${productId}`).then(response => {
            this.setState({
                product: response.data.product,
                items: response.data.items,
                loading: false
            });
        });
    }

    handleEdit(e) {
        e.preventDefault();

        let path = `/editproduct/` + this.state.product.id;
        this.props.history.push(path);
    }

    handleDelete(e) {
        e.preventDefault();

        const productId = this.state.product.id;

        axios.delete(`/api/deleteproduct/${productId}`).then(response => {
            this.props.history.push("/product");
        });
    }

    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        const { product, items } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {this.state.loading ? (
                            <Loading />
                        ) : (
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    {product.product}
                                    <div>
                                        <span
                                            className="badge badge-primary badge-pill pointer mr-1"
                                            onClick={this.handleEdit}
                                        >
                                            <i className="fas fa-pen"></i>
                                        </span>
                                        <span
                                            className="badge badge-danger badge-pill pointer"
                                            onClick={this.handleDelete}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <Link
                                        className="btn btn-primary btn-sm mb-3"
                                        to={
                                            "/product/" +
                                            product.id +
                                            "/additem"
                                        }
                                    >
                                        Add Item
                                    </Link>
                                    <ul className="list-group list-group-flush">
                                        {items == ""
                                            ? "No Menu Added"
                                            : items.map(item => (
                                                  <Link
                                                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                      to={`/product/${product.id}/item/${item.id}`}
                                                      key={item.id}
                                                  >
                                                      {item.name}
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

export default withRouter(ProductDetail);
