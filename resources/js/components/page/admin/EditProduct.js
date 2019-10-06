import axios from "axios";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    componentDidMount() {
        const productId = this.props.match.params.id;

        axios.get(`/api/product/${productId}`).then(response => {
            this.setState({
                name: response.data.product.product,
                image: response.data.product.image
            });
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleEdit(event) {
        event.preventDefault();

        const { history } = this.props;

        const productId = this.props.match.params.id;

        const data = {
            name: this.state.name,
            image: this.state.image
        };

        axios
            .post(`/api/editproduct/${productId}`, data, { _method: "patch" })
            .then(response => {
                // redirect
                history.push("/product/" + this.props.match.params.id);
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
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
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Edit Product</div>
                            <div className="card-body">
                                <form onSubmit={this.handleEdit}>
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Product name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("name")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("name")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            id="image"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("image")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="image"
                                            value={this.state.image}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("image")}
                                    </div>
                                    <button className="btn btn-primary">
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditProduct);
