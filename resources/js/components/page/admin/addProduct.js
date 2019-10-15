import axios from "axios";
import React, { Component } from "react";

class addProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            errors: [],
            loading: false
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleImageChange(event) {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    }

    handleAddProduct(event) {
        event.preventDefault();

        this.setState({ loading: true });

        const { history } = this.props;

        const formData = new FormData();
        formData.append("image", this.state.image);
        formData.append("name", this.state.name);

        axios
            .post("/api/addproduct", formData)
            .then(response => {
                this.setState({ loading: false });
                // redirect to the homepage
                history.push("/product");
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors,
                    loading: false
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
                            <div className="card-header">Add Product</div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.handleAddProduct}
                                    encType="multipart/form-data"
                                >
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
                                            className={`form-control upload ${
                                                this.hasErrorFor("image")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="image"
                                            type="file"
                                            onChange={this.handleImageChange}
                                        />
                                        {this.renderErrorFor("image")}
                                    </div>
                                    {this.state.loading ? (
                                        <button
                                            className="btn btn-primary"
                                            disabled="disabled"
                                        >
                                            <i className="fas fa-spinner fa-pulse load-circle"></i>
                                            Adding...
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary">
                                            Add Product
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default addProduct;
