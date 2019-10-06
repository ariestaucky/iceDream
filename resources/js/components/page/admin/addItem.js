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
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleAddItem(event) {
        event.preventDefault();

        const { history } = this.props;

        const item = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            item_qty: this.state.item_qty,
            product_id: this.props.match.params.id,
            image: this.state.image
        };

        axios
            .post("/api/additem", item)
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

export default addItem;
