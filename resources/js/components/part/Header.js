import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import UserNav from "./UserNav";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        let cart = localStorage.getItem("cart");
        let token = localStorage.getItem("token");

        if (token !== null) {
            axios
                .post("/api/check")
                .then(response => {
                    this.props.auth.userHasAuthenticated(
                        true,
                        response.data.token,
                        response.data.user
                    );
                    localStorage.setItem("token", response.data.token);
                })
                .catch(error => {
                    localStorage.removeItem("token");
                    // this.setState({
                    //     errors: error.response.data.errors
                    // });
                });
        } else if (cart) {
            console.log("mount");
            const shooping = JSON.parse(cart);
            var count = Object.keys(shooping).length;
            this.props.auth.shooping_cart(count);
        } else {
            return;
        }
    }

    handleSearch(e) {
        e.preventDefault();
        const keyword = this.state.search;
        console.log(keyword);
        axios.get("/api/search?search=" + keyword).then(response => {
            this.props.history.push({
                pathname: "/search",
                search: "?search=".$keyword,
                state: { detail: response.data }
            });
        });
    }

    render() {
        if (this.props.location.pathname == "/") return null;
        const { auth } = this.props;

        return (
            <Fragment>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top small-nav">
                    <div className="container">
                        <Link className="navbar-brand" to="/"></Link>
                        <ul className="navbar-nav">
                            <li className="navbar-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/contact">
                                    Contact
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/menu">
                                    Menu
                                </Link>
                            </li>

                            <UserNav childProps={this.props} />
                        </ul>
                    </div>
                </nav>
                <nav className="navbar navbar-expand-md bg-transparent navbar-light large-nav">
                    <div className="container">
                        <div className="navbar-logo">
                            <i
                                className="fas fa-bars mr-3 mt-3 pointer burger"
                                onClick={auth.drawerToggleClickedHandler}
                            ></i>

                            <Link className="navbar-brand" to="/menu">
                                <h2>IceDREAM</h2>
                            </Link>
                        </div>

                        <div className="row right-input">
                            <form
                                className="form-inline mr-2"
                                role="search"
                                onSubmit={this.handleSearch.bind(this)}
                            >
                                <div className="input-group right-side">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="search"
                                        name="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={this.state.search}
                                        onChange={this.handleFieldChange}
                                    />
                                    {/* <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-primary"
                                            type="submit"
                                        >
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div> */}
                                </div>
                            </form>
                            <ul className="navbar-nav cart-button">
                                <li className="navbar-item">
                                    <Link
                                        className="btn btn-primary text-white nav-link"
                                        to="/cart"
                                    >
                                        <i className="fas fa-shopping-cart"></i>
                                        <span>&nbsp;Cart</span>
                                        <span className="item-number">
                                            {auth.cart}
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }
}

export default withRouter(Header);
