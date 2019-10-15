import axios from "axios";
import React, { Component } from "react";

class addItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            description: "",
            price: "",
            item_qty: "",
            errors: [],
            loading: false
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
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

    handleAddItem(event) {
        event.preventDefault();

        this.setState({ loading: true });

        const { history } = this.props;

        const formData = new FormData();
        formData.append("image", this.state.image);
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);
        formData.append("item_qty", this.state.item_qty);
        formData.append("product_id", this.props.match.params.id);

        axios
            .post("/api/additem", formData)
            .then(response => {
                this.setState({ loading: false });
                // redirect
                history.push("/product/" + this.props.match.params.id);
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
                            <div className="card-header">Add Item</div>
                            <div className="card-body">
                                <form onSubmit={this.handleAddItem}>
                                    <div className="form-group">
                                        <label htmlFor="name">Item name</label>
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
                                            type="file"
                                            className={`form-control upload ${
                                                this.hasErrorFor("image")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="image"
                                            onChange={this.handleImageChange}
                                        />
                                        {this.renderErrorFor("image")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            id="price"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("price")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="price"
                                            value={this.state.price}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("price")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="item_qty">
                                            Item Quantity
                                        </label>
                                        <input
                                            id="item_qty"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("item_qty")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="item_qty"
                                            value={this.state.item_qty}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("item_qty")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className={`form-control ${
                                                this.hasErrorFor("description")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="description"
                                            rows="10"
                                            value={this.state.description}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("description")}
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
                                            Add Item
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

export default addItem;
