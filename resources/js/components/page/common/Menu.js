import React, { Component } from "react";
import Axios from "axios";
import MenuList from "./MenuList";
import Loading from "../../_config/Loading_2";

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            loading: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        Axios.get("/api/product").then(response => {
            this.setState({ products: response.data, loading: false });
        });
    }

    render() {
        const { products, loading } = this.state;

        return (
            <div>
                <h1 className="mb-5 text-center">FEATURED MENUS</h1>
                <div className="container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="row">
                            {products.map((product, index) => (
                                <MenuList product={product} key={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Menu;
