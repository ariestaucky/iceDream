import React, { Component } from "react";

export default class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {}
        };
        this.editRoute = this.editRoute.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const itemId = this.props.match.params.id;

        axios.get(`/api/item/${itemId}`).then(response => {
            this.setState({
                item: response.data
            });
        });
    }

    editRoute(event) {
        event.preventDefault();

        let path = `/edititem/` + this.state.item.id;
        this.props.history.push(path);
    }

    handleDelete(e) {
        e.preventDefault();

        const itemId = this.state.item.id;

        axios.delete(`/api/deleteitem/${itemId}`).then(response => {
            this.props.history.push("/product");
        });
    }

    render() {
        const { item } = this.state;
        return (
            <div className="container">
                <div className="card-body">
                    <div className="row item-detail">
                        <div className="col-md-3">
                            <div className="image">
                                <img
                                    src={item.image}
                                    className="product-image"
                                />
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="content">
                                <div className="product-detail">
                                    <h1 className="product-name">
                                        {item.name}
                                    </h1>
                                    <div className="product-price">
                                        <span className="price">
                                            ${item.price}
                                        </span>
                                    </div>
                                    <div className="product-info">
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="product-quantity">
                                        <span className="label">
                                            Availability
                                        </span>
                                        <div className="qty">
                                            <p className="qty-box">
                                                {item.item_qty}
                                            </p>

                                            <button
                                                className="edit-item"
                                                onClick={this.editRoute}
                                            >
                                                Edit
                                            </button>
                                            <div
                                                className="delete-item btn-danger"
                                                onClick={this.handleDelete}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
